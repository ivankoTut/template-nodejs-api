/**
 * Created by user on 02.02.2017.
 */
import express from 'express';
import * as UserController from '../controllers/User';

const router = express.Router();

router.get('/current-user',UserController.getCurrentUser);


export default router;