import pool from "../data/db.js";
import { Router }from "express";
const orszagokRoutes = Router();

orszagokRoutes.get("/", async (req, res) => {
   let sql = `SELECT eloadok.orszag, COUNT(DISTINCT eloadok.id) AS eloadoDb, COUNT(albumok.id) AS albumDb FROM eloadok LEFT JOIN albumok ON eloadok.id = albumok.eloado_id GROUP BY eloadok.orszag ORDER BY eloadok.orszag ASC; `;

   let [eredmeny] = await pool.query(sql);
   res.json(eredmeny);
});

export default orszagokRoutes;