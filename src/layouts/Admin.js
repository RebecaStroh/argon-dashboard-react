/*global chrome*/
import React, { useEffect, useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminFooter from "components/AdminFooter.js";
import Sidebar from "components/Sidebar.js";

import { getAreasData, getLattesData, getGroups } from '../utils';
import Index from "views/Index.js";
import GroupList from "views/GroupList.js";
import CVList from "views/CVList.js";
import Comments from "views/Comments";
import Questions from "views/Questions";
import OtherInfos from "views/OtherInfos";
import Credits from "views/Credits";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const [allQualisScores, setAllQualisScores] = useState([]);
  const [area, setArea] = useState({});
  const [authors, setAuthors] = useState([]);
  const [groups, setGroups] = useState([]);
  const [authorsNameLink, setAuthorsNameLink] = useState([]);

  async function getInfos() {
    // Get Qualis Scores
    setAllQualisScores(await getAreasData());
    setGroups(await getGroups());

    // Update area data (if previously saved in local store)
    // const data = await chrome.storage.local.get(['area_data']);
    // if (Object.keys(data).length > 0) {
    //   setArea(data.area_data);
    // }

    // Get Authors
    getLattesData().then(async (authorList) => {
      if (authors.length == 0 && authorList.length != 0) {
        setAuthors(authorList);
        setAuthorsNameLink(Object.entries(authorList).map(author =>( {link: author[0],name: author[1].name})));
      }
    });
  }

  const routes = [
    {
      path: "/index",
      component: <Index authors={authors} allQualisScores={allQualisScores} groups={groups} authorsNameLink={authorsNameLink}/>,
      layout: "/admin",
    },
    {
      path: "/cv-list",
      component: <CVList authors={authors}/>,
      layout: "/admin",
    },
    {
      path: "/group-list",
      component: <GroupList authors={authors} groups={groups}/>,
      layout: "/admin",
    },
    {
      path: "/questions",
      component: <Questions />,
      layout: "/admin",
    },
    {
      path: "/comments",
      component: <Comments />,
      layout: "/admin",
    },
    {
      path: "/other-infos",
      component: <OtherInfos />,
      layout: "/admin",
    },
    {
      path: "/credits",
      component: <Credits />,
      layout: "/admin",
    }
  ];

  useEffect(() => {
    getInfos()
  }, []);

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/qlattes-logo.png"),
          imgAlt: "Qlattes",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <Routes>
          {routes.map((prop, key) =>
            <Route path={prop.path} element={prop.component} key={key} exact />
          )}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
