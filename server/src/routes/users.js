import {Router} from 'express'
import Table from '../table';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import { makeHash } from "../../lib/utils/hash";

let router = Router();
let classTable = new Table('users');



router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
    res.json(req.user);
});


export default router;