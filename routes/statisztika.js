import pool from "../data/db.js";
import { Router }from "express";
const statisztikaRoutes = Router();

statisztikaRoutes.get("/eloadok", async (req, res) => {
    let sql = `SELECT eloadok.nev AS eloado, COUNT(albumok.id) AS albumDb, MIN(albumok.ev) AS elso, MAX(albumok.ev) AS utolso FROM eloadok LEFT JOIN albumok ON eloadok.id = albumok.eloado_id GROUP BY eloadok.id, eloadok.nev ORDER BY albumDb DESC, eloadok.nev ASC;`;
    let [eredmeny] = await pool.query(sql);
    res.json(eredmeny);
});

export default statisztikaRoutes;