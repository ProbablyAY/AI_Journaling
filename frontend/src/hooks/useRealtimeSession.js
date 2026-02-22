import { useEffect, useRef, useState } from 'react';
import { getRealtimeToken, sendUtteranceBatch } from '../api/sessions';

export const useRealtimeSession = (sessionId) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const peerRef = useRef(null);
  const audioRef = useRef(null);
  const utteranceBuffer = useRef([]);

  const flushUtterances = async () => {
    if (!sessionId || utteranceBuffer.current.length === 0) return;
    const batch = [...utteranceBuffer.current];
    utteranceBuffer.current = [];
    try { await sendUtteranceBatch(sessionId, batch); } catch { utteranceBuffer.current = batch; }
  };

  const stop = async () => {
    await flushUtterances();
    peerRef.current?.close();
    peerRef.current = null;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.srcObject = null; }
    setStatus('idle');
  };

  const start = async () => {
    try {
      setError(null);
      setStatus('connecting');
      const { data } = await getRealtimeToken(sessionId);
      const pc = new RTCPeerConnection();
      peerRef.current = pc;
      audioRef.current = new Audio();
      audioRef.current.autoplay = true;
      pc.ontrack = (event) => {
        if (audioRef.current) audioRef.current.srcObject = event.streams[0];
        setStatus('speaking');
      };

      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      media.getTracks().forEach((track) => pc.addTrack(track, media));
      const channel = pc.createDataChannel('oai-events');
      channel.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          const text = payload?.transcript || payload?.delta || payload?.text;
          if (payload?.speaker && text) utteranceBuffer.current.push({ speaker: payload.speaker, text, startMs: payload.startMs, endMs: payload.endMs });
          if (payload?.type?.includes('response') && text) utteranceBuffer.current.push({ speaker: 'ai', text });
          if (payload?.type?.includes('audio.input')) setStatus('listening');
          if (payload?.type?.includes('response.audio')) setStatus('speaking');
        } catch {}
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      const response = await fetch(`https://api.openai.com/v1/realtime?model=${data.model}`, {
        method: 'POST', body: offer.sdp,
        headers: { Authorization: `Bearer ${data.client_secret.value}`, 'Content-Type': 'application/sdp' },
      });
      const answerSdp = await response.text();
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
      setStatus('connected');
    } catch (e) {
      setStatus('error');
      setError(e.message);
    }
  };

  useEffect(() => () => { stop(); }, []);
  return { start, stop, status, error };
};
