import React from 'react';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react';
import JobList from './JobList';
import useWebSocket from 'react-use-websocket';

function App() {
  const socketUrl = 'ws://23d4-146-19-247-59.ngrok-free.app';
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('WebSocket opened'),
    shouldReconnect: closeEvent => true,
  });

  React.useEffect(() => {
    if (lastMessage && lastMessage.data === 'GET') {
      console.log('Received GET event message.');
      // handle GET event message
      if (Notification.permission === 'granted') {
        new Notification('Job List Refreshed', {
          body: 'New Upwork jobs are available.',
          icon: 'notification-icon.png',
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Job List Refreshed', {
              body: 'New Upwork jobs are available.',
              icon: 'notification-icon.png',
            });
          }
        });
      }
    }
  }, [lastMessage]);

  if (!lastMessage) return <>Loading...</>;
  return (
    <ChakraProvider>
      <CSSReset />
      <Box p={8}>
        <JobList jobs={lastJsonMessage} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
