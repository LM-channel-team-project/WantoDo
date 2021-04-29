import { Router } from 'express';

import taskController from '../../controllers/v1/task.controller';

const taskRouter = Router();

taskRouter.post('/', taskController.createTask);

export default taskRouter;
