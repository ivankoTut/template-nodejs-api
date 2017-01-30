/**
 * Created by user on 30.01.2017.
 */
import express from 'express';
import * as AuthController from '../controllers/Auth';

const router = express.Router();

router.post('/signup',AuthController.signup);
router.post('/signin',AuthController.signin);

export default router;