type wantodoErrorCodes = 10000 | 10001 | 10002;

export default class WantodoException extends Error {
	public status: number = 0;

	public type: string = 'WantodoException';

	public name: string = '';

	public errorCode: number = 0;

	constructor(errorCode: wantodoErrorCodes, msg?: string) {
		super(msg);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, WantodoException);
		}

		this.switchError(errorCode);
	}

	private switchError(errorCode: number) {
		switch (errorCode) {
			case 10001:
				this.validationException();
				break;
			case 10002:
				this.notFoundException();
				break;
			default:
				this.defaultException();
				break;
		}
	}

	private defaultException() {
		this.status = 500;
		this.name = 'WantodoException';
		this.errorCode = 10000;
		this.message = this.message || 'WantodoException';
	}

	private validationException() {
		this.status = 422;
		this.name = 'ValidationException';
		this.errorCode = 10001;
		this.message = this.message || 'ValidationException';
	}

	private notFoundException() {
		this.status = 404;
		this.name = 'NotFoundException';
		this.errorCode = 10002;
		this.message = this.message || 'NotFoundException';
	}
}
