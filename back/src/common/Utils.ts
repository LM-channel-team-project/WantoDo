import { Result, ValidationError } from 'express-validator';

/**
 * @author 강성모(castleMo)
 * @since 21/05/11
 *
 * @param validationErrors validationErrors
 */
const mixingValidationErrorMessage = (validationErrors: Result<ValidationError>): string => {
	let message = '';

	validationErrors.array().forEach((value: ValidationError, index: number) => {
		console.log(value);
		message += `${value.location}.${value.param} ${value.msg}`;
		if (index < validationErrors.array().length - 1) {
			message += ' | ';
		}
	});

	return message;
};

export default {
	mixingValidationErrorMessage,
};
