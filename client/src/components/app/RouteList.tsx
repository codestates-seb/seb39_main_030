import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loading from './Loading';
import AddDebatePage from '../page/AddDebate/AddDebatePage';

const Lending = lazy(() => import('../page/Lending/LendingPage'));
const Oauth = lazy(() => import('../../auth/Oauth'));

const RouteList = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Lending />}></Route>
        <Route path="/:searchWord" element={<Lending />}></Route>
        <Route path="/auth" element={<Oauth />}></Route>
        <Route path="/add-debate" element={<AddDebatePage />}></Route>
      </Routes>
    </Suspense>
  );
};

export default RouteList;
