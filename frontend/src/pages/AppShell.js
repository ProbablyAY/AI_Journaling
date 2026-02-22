import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { Button } from '../components/ui/button';
import { logout } from '../api/auth';

export const AppShell = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const nav = [ROUTES.SESSIONS, ROUTES.MEMORY, ROUTES.SETTINGS];

  return (
    <div className='min-h-screen dashboard-bg cyber-grid'>
      <div className='max-w-6xl mx-auto p-6'>
        <header className='glass-card rounded-xl p-4 mb-6 flex justify-between'>
          <h1 className='tech-font text-2xl gradient-text'>EchoDiary</h1>
          <div className='flex items-center gap-3'>
            {nav.map((to) => <Link key={to} className={location.pathname.startsWith(to) ? 'cyber-text-neon' : 'cyber-text-secondary'} to={to}>{to.replace('/', '')}</Link>)}
            <Button variant='outline' onClick={async () => { await logout(); navigate(ROUTES.LOGIN); }}>Logout</Button>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};
