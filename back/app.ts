import express from 'express';
import cors from 'cors';

import configs from './src/config';
import router from './src/routes';

const app = express();

app.use(cors());
app.use(express.static('./'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// router
app.use('/api', router);

// start
app.listen(configs.port, () => {
    console.log(`backend start!! port: ${configs.port}`);
});