import express from 'express';
import cors from 'cors';

import configs from './config';
import router from './routes';
import './lib/wantodoMongoose';

const app = express();

app.use(cors());
app.use(express.static('./'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use('/api', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(new Error('404 Error'));
});

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
