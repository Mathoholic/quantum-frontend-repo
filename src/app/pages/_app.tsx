import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Sidebar from './components/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
   
      <Sidebar />
   
      
      <div style={{ flexGrow: 1, marginLeft: '200px' }}> 
        <Component {...pageProps} />
        <ToastContainer/>
      </div>
    </div>
  );
};

export default MyApp;
