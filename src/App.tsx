import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import Submissions from './pages/submissions';
import SubmissionDetails from './pages/submission-details';
import Forms from './pages/forms';
import FormDetails from './pages/form-details';
import NotFound from './pages/not-found';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/submissions" replace />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/submission/:id" element={<SubmissionDetails />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/forms/:id" element={<FormDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
