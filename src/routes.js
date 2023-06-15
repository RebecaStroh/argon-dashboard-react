import Index from "views/Index.js";
import GroupList from "views/GroupList.js";
import CVList from "views/CVList.js";
import Comments from "views/Comments";
import Questions from "views/Questions";
import OtherInfos from "views/OtherInfos";
import Credits from "views/Credits";

var routes = [
  {
    path: "/index",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/cv-list",
    component: <CVList />,
    layout: "/admin",
  },
  {
    path: "/group-list",
    component: <GroupList />,
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
export default routes;
