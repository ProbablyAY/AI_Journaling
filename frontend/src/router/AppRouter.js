import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../routes';
import { AppShell } from '../pages/AppShell';
import { AuthPage } from '../pages/AuthPage';
import { SessionsPage } from '../pages/SessionsPage';
import { SessionDetailPage } from '../pages/SessionDetailPage';
import { MemoryPage } from '../pages/MemoryPage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRouter = () => (
  <Routes>
    <Route path='/' element={<Navigate to={ROUTES.LOGIN} replace />} />
    <Route path={ROUTES.LOGIN} element={<AuthPage mode='login' />} />
    <Route path={ROUTES.SIGNUP} element={<AuthPage mode='signup' />} />
    <Route element={<AppShell />}>
      <Route path={ROUTES.SESSIONS} element={<SessionsPage />} />
      <Route path={ROUTES.SESSION_DETAIL()} element={<SessionDetailPage />} />
      <Route path={ROUTES.MEMORY} element={<MemoryPage />} />
      <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
    </Route>
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);
