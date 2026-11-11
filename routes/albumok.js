import pool from "../data/db.js";
import { Router }from "express";
const albumokRoutes = Router();


albumokRoutes.get("/", async (req, res) => {
    let params =[];
    let szurok = [];
    const { mufaj, tol, ig } = req.query;
    if(mufaj) {
        szurok.push("albumok.mufaj = ?");
        params.push(mufaj);
    }
    if (tol && isNaN(tol)) {
    return res.status(400).json({ hiba: "Hibás kezdőév! Csak számokat lehet megadni. Pl: 1980" });
    }
    if(ig && isNaN(ig)) {
        return res.status(400).json({ hiba: "Hibás végév! Csak számokat lehet megadni. Pl: 2020" });
    }
    if(ig ) {
        szurok.push("albumok.ev <= ?");
        params.push(ig);
    }
    let sql = "SELECT albumok.id, albumok.cim, eloadok.nev AS eloado, albumok.ev, albumok.mufaj, albumok.hossz FROM albumok LEFT JOIN eloadok ON albumok.eloado_id = eloadok.id";
    if(szurok.length > 0) {
        sql += " WHERE " + szurok.join(" AND ");
    }
    sql += " ORDER BY albumok.ev ASC, albumok.cim ASC;";
    let [eredmeny] = await pool.query(sql, params);
    res.json(eredmeny);
});

albumokRoutes.get("/kereses", async (req, res) => {
    const q = req.query.q;

    if (!q || q.length < 2) {
        return res.status(400).json({ hiba: "Legalább 2 karakter szükséges!" });
    }

    let sql = `SELECT albumok.id, albumok.cim, eloadok.nev AS eloado, albumok.ev, albumok.mufaj, albumok.hossz FROM albumok LEFT JOIN eloadok ON albumok.eloado_id = eloadok.id WHERE LOWER(albumok.cim) LIKE LOWER(?) OR LOWER(eloadok.nev) LIKE LOWER(?) ORDER BY albumok.ev ASC, albumok.cim ASC;`;
    let [eredmeny] = await pool.query(sql, [`%${q}%`, `%${q}%`]);
    res.json(eredmeny);
});


export default albumokRoutes;