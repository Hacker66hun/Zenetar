import pool from "../data/db.js";
import { Router }from "express";
const eloadoRoutes = Router();

eloadoRoutes.get("/", async (req, res) => {
    const orszag = req.query.orszag;
    let sql = "SELECT nev FROM eloadok";
    let params = [];
    if (orszag) {
        sql += " WHERE orszag = ?";
        params.push(orszag);
    }
    sql += " ORDER BY nev ASC;";
    let [eredmeny] = await pool.query(sql, params);
    res.json(eredmeny);
});


eloadoRoutes.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (isNaN(id) || !Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({ hiba: "Hibás ID!" });
    }
    let sql = "SELECT * FROM eloadok Where id = ?;";
    let [eredmeny] = await pool.query(sql, [id]);
    if (eredmeny.length === 0) {
        return res.status(404).json({ hiba: "Nincs ilyen előadó!" });
    }

    const eloado = eredmeny[0];
    let sqlAlbumok = "SELECT cim, ev, mufaj, hossz FROM albumok WHERE eloado_id = ? ORDER BY ev ASC;";
    let [albumok] = await pool.query(sqlAlbumok, [id]);

    res.json({ eloado, albumok });
});

//eloadoRoutes.get("/orszag", async (req, res) => {
    //const orszag = req.query.orszag;
    //let sql = "SELECT nev, orszag FROM eloadok WHERE orszag = ?;";
    //let [eredmeny] = await pool.query(sql, [orszag]);
    //res.json(eredmeny);
//});


export default eloadoRoutes;