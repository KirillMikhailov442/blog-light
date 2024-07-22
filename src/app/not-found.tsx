import NotFoundScreen from '@screens/NotFound/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ошибка 404',
};

const NotFound = () => <NotFoundScreen />;

export default NotFound;
