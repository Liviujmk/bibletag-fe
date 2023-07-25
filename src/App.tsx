import { MantineProvider } from '@mantine/core';
import { Router } from './router/router';
import { Notifications } from '@mantine/notifications';


export default function App() {
  document.title = 'BibleTag -- Bible Verse Tagging';
  return (
    <MantineProvider 
      withGlobalStyles 
      withNormalizeCSS
      theme={{
        fontFamily: 'Poppins, sans-serif',
        fontFamilyMonospace: 'Poppins, sans-serif',
        headings: { fontFamily: 'Poppins, sans-serif' },
      }}
    >
      <Notifications position="top-right" autoClose={3000} />
      <Router />
    </MantineProvider>
  );
}