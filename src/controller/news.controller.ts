import { Request, Response } from "express";
import axios from "axios";

const API_KEY = process.env.NEWS_API_KEY;

export default class NewsController {
  async getNews(req: Request, res: Response) {
   const query = `"importações de produtos" OR "Exportações de produtos"`;

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=pt&sortBy=publishedAt&apiKey=${API_KEY}`;

    try {
      const response = await axios.get(url);
      return res.status(200).json(response.data);
    } catch (err: any) {
      return res.status(500).json({ error: "Erro ao buscar notícias" });
    }
  }
}