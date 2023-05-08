import { Message } from 'semantic-ui-react';
import { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';

import './Notifications.scss';

const NotificationsComponent = () => {
  const { notification } = useContext(NotificationContext);

  if (!notification) return null;

  const color = notification.type === 'success' ? 'green' : 'red';

  return (
    <Message id="notification-bar" color={color}>
      {notification.message}
    </Message>
  );
};

export default NotificationsComponent;
