import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Sidebar from './components/Sidebar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
   
      <Sidebar />
   
      
      <div style={{ flexGrow: 1, marginLeft: '200px' }}> 
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default MyApp;
