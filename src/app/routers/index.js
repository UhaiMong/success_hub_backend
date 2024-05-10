import express from "express";
import { UserRoutes } from "../modules/users/user.route.js";
import { BannerRoutes } from "../modules/banner/banner.route.js";
import { EventRoutes } from "../modules/event/event.route.js";
import { NewsRoute } from "../modules/news/news.route.js";

const routers = express.Router();

const routerModule = [
  {
    path: "/users",
    route: UserRoutes,
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
];

routerModule.forEach((route) => routers.use(route.path, route.route));

export default routers;
