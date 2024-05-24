import express from "express";
import { UserRoutes } from "../modules/users/user.route.js";
import { BannerRoutes } from "../modules/banner/banner.route.js";
import { EventRoutes } from "../modules/event/event.route.js";
import { NewsRoute } from "../modules/news/news.route.js";
import { AdminRoute } from "../modules/admin/admin.route.js";
import { AlumniRoute } from "../modules/alumnus/alumni.route.js";
import { ContactRoute } from "../modules/contact/contact.route.js";

const routers = express.Router();

const routerModule = [
  {
    path: "/admin",
    route: AdminRoute,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/alumni",
    route: AlumniRoute,
  },
  {
    path: "/event",
    route: EventRoutes,
  },
  {
    path: "/news",
    route: NewsRoute,
  },
  {
    path: "/banner",
    route: BannerRoutes,
  },
  {
    path: "/contact",
    route: ContactRoute,
  },
];

routerModule.forEach((route) => routers.use(route.path, route.route));

export default routers;
