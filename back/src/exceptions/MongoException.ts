import { Error as MongooseError } from 'mongoose';

class MongoException extends Error {
	public status: number = 0;

	public type: string = 'MongoDBException';

	public name: string = '';

	public errorCode: number = 0;

	constructor(mongoError: MongooseError, msg?: string) {
		super(msg || mongoError.message);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, MongoException);
		}

		this.switchError(mongoError.name);
	}

	private switchError(name: string) {
		switch (name) {
			default:
				this.defaultException();
				break;
		}
	}

	private defaultException() {
		this.status = 500;
		this.name = 'MongoException';
		this.errorCode = 30001;
		this.message = this.message || 'MongoException';
	}
}

export default MongoException;
