import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { approveMemory, rejectMemory } from '../api/memory';
import { endSession, getSession } from '../api/sessions';
import { useRealtimeSession } from '../hooks/useRealtimeSession';

export const SessionDetailPage = () => {
  const { id } = useParams();
  const realtime = useRealtimeSession(id);
  const [session, setSession] = useState(null);
  const load = async () => { if (!id) return; const { data } = await getSession(id); setSession(data.session); };
  useEffect(() => { load(); }, [id]);
  useEffect(() => {
    if (session?.status !== 'processing') return undefined;
    const t = setInterval(load, 2500);
    return () => clearInterval(t);
  }, [session?.status]);

  return <div className='space-y-4'><div className='glass-card rounded p-4'><p>Realtime: {realtime.status}{realtime.error ? ` - ${realtime.error}` : ''}</p><div className='flex gap-2 mt-2'><button className='bg-cyan-500/80 px-4 py-2 rounded' onClick={realtime.start}>Start Conversation</button><button className='bg-rose-500/80 px-4 py-2 rounded' onClick={async () => { await realtime.stop(); await endSession(id); await load(); }}>End Conversation</button></div></div>{session?.status === 'processing' && <p>Processing...</p>}{session?.artifact && <div className='glass-card rounded p-4'><h3 className='text-xl mb-2'>{session.title}</h3><pre className='whitespace-pre-wrap'>{session.artifact.curatedEntryMd}</pre></div>}{session?.memoryCandidates?.length ? <div className='glass-card rounded p-4 space-y-2'><h4>Memory candidates</h4>{session.memoryCandidates.map((m) => <div key={m.id} className='flex justify-between gap-2'><p>{m.text}</p><div className='flex gap-2'><button className='px-3 py-1 bg-emerald-600 rounded' onClick={async () => { await approveMemory(m.id); await load(); }}>Approve</button><button className='px-3 py-1 bg-slate-700 rounded' onClick={async () => { await rejectMemory(m.id); await load(); }}>Reject</button></div></div>)}</div> : null}</div>;
};
