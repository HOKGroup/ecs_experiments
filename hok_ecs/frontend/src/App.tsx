import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import CreateRelationship from './routes/CreateRelationship';
import NoMatch from './routes/NoMatch';
import Home from './routes/Home';
import Relationships from './routes/Relationships';
import Relationship from './routes/Relationship';
import Layout from './Layout';
import './app.css';
import withSuspense from './withSuspense';

const CreateRelationship = withSuspense(
  React.lazy(() => import('./routes/CreateRelationship')),
);

const App: React.FC = () => {
  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.replace('/app');
    }
  }, []);

  return (
    <BrowserRouter basename="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="createRelationship" element={<CreateRelationship />} />

          <Route path="relationships" element={<Relationships />} />
          <Route
            path="relationships/:relationshipGuid"
            element={<Relationship />}
          />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
