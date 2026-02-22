import { useEffect, useState } from 'react';
import { listApprovedMemory } from '../api/memory';

export const MemoryPage = () => {
  const [memories, setMemories] = useState([]);
  useEffect(() => { listApprovedMemory().then(({ data }) => setMemories(data.memories || [])); }, []);
  return <div className='glass-card rounded p-4 space-y-2'>{memories.map((m) => <p key={m.id}>{m.category}: {m.text}</p>)}</div>;
};
