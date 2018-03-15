import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import StopsRouter from './stops';
import UsersRouter from './users';
import ImagesRouter from './images';
import SearchRouter from './search';
import RegisterRouter from './register';

let router = Router();


router.use('/register', RegisterRouter);

router.use('/auth', authRouter);


router.route('*')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.use('/search', SearchRouter);
router.use('/stops', StopsRouter);
router.use('/users', UsersRouter);
router.use('/images', ImagesRouter);

export default router;