import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, signup } from '../api/auth';
import { ROUTES } from '../routes';

export const AuthPage = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') await login(email, password); else await signup(email, password);
      navigate(ROUTES.SESSIONS);
    } catch (err) { setError(err.message); }
  };

  return <div className='min-h-screen dashboard-bg flex items-center justify-center p-4'><form onSubmit={onSubmit} className='glass-card p-8 rounded-xl w-full max-w-md space-y-4'><h2 className='text-2xl gradient-text tech-font'>{mode === 'login' ? 'Welcome back' : 'Create account'}</h2><input className='w-full p-3 rounded bg-slate-900/70' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required /><input className='w-full p-3 rounded bg-slate-900/70' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />{error && <p className='text-red-300 text-sm'>{error}</p>}<button className='w-full bg-cyan-500/80 rounded p-3 font-semibold'>{mode === 'login' ? 'Login' : 'Sign up'}</button><Link to={mode === 'login' ? ROUTES.SIGNUP : ROUTES.LOGIN} className='text-cyan-200 text-sm block'>{mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login'}</Link></form></div>;
};
