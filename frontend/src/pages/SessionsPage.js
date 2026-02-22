import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSession, listSessions } from '../api/sessions';
import { ROUTES } from '../routes';

export const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const load = async () => { const { data } = await listSessions(); setSessions(data.sessions || []); };
  useEffect(() => { load(); }, []);

  return <div className='space-y-4'><button className='bg-purple-500/80 px-4 py-2 rounded' onClick={async () => { const { data } = await createSession(); navigate(ROUTES.SESSION_DETAIL(data.session.id)); }}>Start Conversation</button>{sessions.map((s) => <button key={s.id} onClick={() => navigate(ROUTES.SESSION_DETAIL(s.id))} className='w-full text-left glass-card rounded p-4'><p className='font-semibold'>{s.title || 'Untitled session'}</p><p className='text-sm text-slate-300'>Status: {s.status}</p></button>)}</div>;
};
