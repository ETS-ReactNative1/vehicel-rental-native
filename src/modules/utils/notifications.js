import PushNotification from 'react-native-push-notification';

export const sendLocalNotification = ({title, message}) => {
  PushNotification.localNotification({
    channelId: 'rental',
    title,
    message,
  });
};