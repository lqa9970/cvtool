import React, { useState } from 'react';

export type NotificationType = {
  message: string;
  type: 'success' | 'error' | '';
};

type NotificationContextType = {
  notification: NotificationType | null;
  showNotification: (notification: NotificationType) => void;
};

type NotificationProviderProps = {
  children: React.ReactNode;
};

const NotificationContext = React.createContext<NotificationContextType>({
  notification: { message: '', type: '' },
  showNotification: () => true
});

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children
}: NotificationProviderProps) => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const showNotification = (notification: NotificationType) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
