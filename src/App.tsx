import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './components/Landing';
import AboutPage from './components/AboutPage';
import RequestAccessPage from './components/RequestAccessPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return <BrowserRouter><ScrollToTop /><Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/request-access" element={<RequestAccessPage />} />
    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
    <Route path="/terms-of-service" element={<TermsOfServicePage />} />
  </Routes></BrowserRouter>;
}
