import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap';
import TopHead from '../components/shared/TopHead';
import Heading from '../components/shared/Heading';
import Footer from '../components/shared/Footer';
import { ToastProvider } from 'react-toast-notifications';
import { Provider } from '../context';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider>
            <Heading />
            <Container>
                <ToastProvider>
                    <NextNProgress />
                    <TopHead />
                    <Component {...pageProps} />
                    <Footer />
                </ToastProvider>
            </Container>
        </Provider>
    );
}

export default MyApp;
