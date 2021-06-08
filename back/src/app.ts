import express from 'express';
import cors from 'cors';

import configs from './config';
import router from './routes';
import './lib/wantodoMongoose';
import Exceptions from './exceptions';
import errorHandler from './middlewares/ErrorHandler';

const app = express();

app.use(cors());
app.use(express.static('./'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger 설정전의 log
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.log(req.params);
	console.log(req.query);
	console.log(req.headers);
	console.log(req.body);
	next();
});

// router
app.use('/api', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(new Exceptions.WantodoException(10002));
});

app.use(errorHandler);

// start
app.listen(configs.port, () => {
	console.log(`backend start!! port: ${configs.port}`);
});

process.on('beforeExit', (code: number) => {
	console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code: number) => {
	console.log('Process exit event with code: ', code);
});
