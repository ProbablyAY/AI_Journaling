import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

export const NotFoundPage = () => <div className='p-8'><p>Page not found.</p><Link to={ROUTES.SESSIONS}>Go to sessions</Link></div>;
