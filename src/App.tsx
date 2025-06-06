import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { QueryProvider } from './providers/query-provider';
import Layout from './components/Layout';
import Submissions from './pages/submissions';
import SubmissionDetails from './pages/submission-details';
import Forms from './pages/forms';
import FormDetails from './pages/form-details';
import NotFound from './pages/not-found';

export default function App() {
  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Submissions />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="submissions/:id" element={<SubmissionDetails />} />
            <Route path="forms" element={<Forms />} />
            <Route path="forms/:id" element={<FormDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </QueryProvider>
  );
}
