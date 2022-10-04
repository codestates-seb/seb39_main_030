import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loading from './Loading';

const Lending = lazy(() => import('../page/Lending/LendingPage'));
const Oauth = lazy(() => import('../../auth/Oauth'));
const AddDebatePage = lazy(() => import('../page/AddDebate/AddDebatePage'));
const DebatePage = lazy(() => import('../page/Debate/DebatePage'));
const AdminContactPage = lazy(
  () => import('../page/AdminContact/AdminContactPage')
);
const AdminPage = lazy(() => import('../page/Admin/AdminPage'));
const ContactList = lazy(() => import('../page/Admin/Contact/ContactList'));
const ContactDetailPage = lazy(
  () => import('../page/Admin/Contact/ContactDetailPage')
);
const ReportList = lazy(() => import('../page/Admin/Report/ReportList'));
const ReportDetail = lazy(() => import('../page/Admin/Report/ReportDetail'));
const MyPage = lazy(() => import('../page/MyPage/MyPage'));
const MyViewPage = lazy(() => import('../page/MyViewPage/MyViewPage'));
const QuestionDetail = lazy(
  () => import('../page/MyViewPage/QuestionList/QuestionDetail')
);

const UpdateSocket = lazy(() => import('../../auth/UpdateSocket'));
const VideoPage = lazy(() => import('../page/VideoChat/VideoPage'));

const RouteList = () => {
  return (
    <Suspense fallback={<Loading sub={false} />}>
      <Routes>
        <Route path="/" element={<Lending />}></Route>
        <Route path="/:searchWord" element={<Lending />}></Route>
        <Route path="/auth" element={<Oauth />}></Route>
        <Route path="/socket" element={<UpdateSocket />}></Route>
        <Route path="/add-debate" element={<AddDebatePage />}></Route>
        <Route path="/debate/:debateCode" element={<DebatePage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/admin-contact" element={<AdminContactPage />}></Route>
        <Route path="/contact-list" element={<ContactList />}></Route>
        <Route
          path="/contact-list/:questionCode"
          element={<ContactDetailPage />}
        ></Route>
        <Route path="/report-list" element={<ReportList />}></Route>
        <Route
          path="/report-list/:declarationCode/:userCode"
          element={<ReportDetail />}
        ></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/myview" element={<MyViewPage />}></Route>
        <Route
          path="/myview/:questionCode"
          element={<QuestionDetail />}
        ></Route>
        <Route path="/video" element={<VideoPage />}></Route>
      </Routes>
    </Suspense>
  );
};

export default RouteList;
