/*global chrome*/
import React, { useEffect, useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminFooter from "components/AdminFooter.js";
import Sidebar from "components/Sidebar.js";

import { fetchJSON, getLattesData } from '../utils';
import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Route path={prop.path} element={prop.component} key={key} exact />
      );
    });
  };

  const [allQualisScores, setAllQualisScores] = useState([]);
  const [area, setArea] = useState({});
  const [authors, setAuthors] = useState([]);

  async function getInfos() {
    // Get Qualis Scores
    setAllQualisScores(await fetchJSON(require("./qualis-scores-by-area-2017-2020.json")));
    // setAllQualisScores(await fetchJSON(chrome.runtime.getURL('data/qualis-scores-by-area-2017-2020.json')));

    // Update area data (if previously saved in local store)
    const data = await chrome.storage.local.get(['area_data']);
    if (Object.keys(data).length > 0) {
      setArea(data.area_data);
    }

    // Get Authors
    getLattesData().then(async (authorList) => {
      if (authors.length == 0 && authorList.length != 0) setAuthors(authorList);
    });
  }

  function updateAuthorsList(authors) {
    setAuthors(authors);
  }

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
          {getRoutes(routes)}
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
