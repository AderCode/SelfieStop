import {Router} from 'express'
import Table from '../table';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import { makeHash } from "../../lib/utils/hash";
import { executeQuery } from '../config/db';

let router = Router();
let classTable = new Table('stops');

router.get('/:id?', (req, res) => {
    console.log('get search stops');
    let sql =
        `SELECT * FROM stops
        WHERE name LIKE "%${req.params.id}";`;
    executeQuery(sql)
        .then((data) => {
            console.log(data)
            res.json(data);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

export default router;