import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loading from './Loading';
import AddDebatePage from '../page/AddDebate/AddDebatePage';

const Lending = lazy(() => import('../page/Lending/LendingPage'));
const Login = lazy(() => import('../../auth/Login'));
const Oauth = lazy(() => import('../../auth/Oauth'));

const RouteList = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Lending />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/auth" element={<Oauth />}></Route>
        <Route path="/add-debate" element={<AddDebatePage />}></Route>
      </Routes>
    </Suspense>
  );
};

export default RouteList;
