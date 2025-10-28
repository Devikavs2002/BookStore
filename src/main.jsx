import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
<GoogleOAuthProvider clientId="433748054927-naj6esgrq9vg2cgsrnmigck55qodslld.apps.googleusercontent.com"> <App /></GoogleOAuthProvider>;
   
    </BrowserRouter>
  </StrictMode>,
)
