import { Router } from 'express';
import { signup, signin, logout, profile } from '../controllers/auth.controller.js';
import { validateSchema } from '../middleware/validateMiddleware.js';
import { signupSchema, signinSchema } from '../schemas/auth.schema.js';
import { isAuth } from '../middleware/isAuth.js';

const router = Router();

router.post('/signup', validateSchema(signupSchema), signup);

router.post('/signin', validateSchema(signinSchema), signin);

router.post('/logout', logout);

router.get('/profile', isAuth, profile);

export default router;