import {Router} from 'express'
import Table from '../table';
// import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';

let router = Router();
let classTable = new Table('users');



// router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
//     res.json(req.user);
// });

router.get('/', (req, res) => {
    console.log('get all users');
    classTable.getAll()
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/:id?', (req, res) => {
    console.log('get 1 user')
    classTable.getOne(req.params.id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    classTable.insert(req.body)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    classTable.update(req.params.id, req.body)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    classTable.delete(req.params.id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});



export default router;