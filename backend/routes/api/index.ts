import express from 'express';

const router = express.Router();

import usersRouter from './users';
import parksRouter from './parks';
import cocktailsRouter from './cocktails';

router.use("/cocktails", cocktailsRouter);
router.use("/parks", parksRouter);
router.use("/users", usersRouter);

export default router;
