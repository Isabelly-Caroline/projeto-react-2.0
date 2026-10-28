import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Pages
import { Home } from './pages/Home';
import { ConceptsHub } from './pages/ConceptsHub';
import { ConceptDetail } from './pages/ConceptDetail';
import { ApiExplorerPage } from './pages/ApiExplorerPage';
import { TaskManagerPage } from './pages/TaskManagerPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conceitos" element={<ConceptsHub />} />
          <Route path="/conceito/:conceptId" element={<ConceptDetail />} />
          <Route path="/api-explorer" element={<ApiExplorerPage />} />
          <Route path="/gerenciador" element={<TaskManagerPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
