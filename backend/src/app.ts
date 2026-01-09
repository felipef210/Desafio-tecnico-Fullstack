import express, { NextFunction, Request, Response } from 'express';
import taskRoutes from './routes/taskRoutes';

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) 
        return res.status(400).json({ message: 'JSON inválido' });
});

app.use('/tasks', taskRoutes);

export default app;
