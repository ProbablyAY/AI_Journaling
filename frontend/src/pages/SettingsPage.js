import { useNavigate } from 'react-router-dom';
import { deleteMe } from '../api/auth';
import { ROUTES } from '../routes';

export const SettingsPage = () => {
  const navigate = useNavigate();
  return <div className='glass-card rounded p-4'><button className='bg-red-700 px-4 py-2 rounded' onClick={async () => { await deleteMe(); navigate(ROUTES.LOGIN); }}>Delete account and all data</button></div>;
};
