import { Router } from "express";
import NewsController from "../controller/news.controller";

const router = Router();
const controller = new NewsController();

router.get("/news", controller.getNews.bind(controller));

export default router;