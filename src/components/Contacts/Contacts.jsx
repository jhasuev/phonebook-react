import {
  Divider,
} from '@mui/material';
import ContactItem from '../ContactItem/ContactItem';

export default function Contacts() {
  return (
    <div>
      <ContactItem />
      <Divider />
      <ContactItem />
      <Divider />
    </div>
  );
}
