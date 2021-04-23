import mongoose from 'mongoose';
import configs from '../config';

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(configs.mongoUrl, { poolSize: configs.mongoPoolSize }).catch((error) => {
	throw error;
});

const conn = mongoose.connection;

conn.on('error', (error) => {
	throw error;
});

conn.once('open', () => {
	console.log('MongoDB Connect Success');
});

const getConnection = () => {
	return conn;
};

export default getConnection();
