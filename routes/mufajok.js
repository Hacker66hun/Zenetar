import pool from "../data/db.js";
import { Router }from "express";
const mufajokRoutes = Router();

mufajokRoutes.get("/", async (req, res) => {
   let sql = "SELECT mufaj, COUNT(*) AS albumDb, SUM(hossz) AS osszHossz FROM albumok GROUP BY mufaj ORDER BY mufaj;"; 
   let [eredmeny] = await pool.query(sql);
   res.json(eredmeny);
});

export default mufajokRoutes;