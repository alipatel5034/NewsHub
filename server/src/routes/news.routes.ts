import { Router } from "express";
import { getCategoryNews, getNews, getTrendingTopics, searchNews } from "../controllers/news.controller";

const router = Router();

router.get("/", getNews);
router.get("/search", searchNews);
router.get("/category/:category", getCategoryNews);
router.get("/trending", getTrendingTopics);

export default router;
