import Index from "views/Index.js";
import GroupList from "views/examples/GroupList.js";
import CVList from "views/examples/CVList.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/cv-list",
    name: "Curriculo",
    component: <CVList />,
    layout: "/admin",
  },
  {
    path: "/group-list",
    name: "Grupos",
    component: <GroupList />,
    layout: "/admin",
  }
];
export default routes;
