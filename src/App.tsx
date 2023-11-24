import { Container, MantineProvider } from '@mantine/core';
import SellTicketPage from './Pages/SellTicketPage';
import theme from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Container fluid p='xl'>
        <SellTicketPage />
      </Container>
    </MantineProvider>
  );
}
