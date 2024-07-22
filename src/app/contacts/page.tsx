import ContactsScreen from '@screens/Contacts/Contacts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Напишите нам сообщение',
};

const Contacts = () => <ContactsScreen />;

export default Contacts;
