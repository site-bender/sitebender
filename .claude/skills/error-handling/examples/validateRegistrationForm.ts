//++ Example: Form validation with Validation monad
//++ Demonstrates error accumulation - collects ALL field errors

import type { Validation } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"
import combineValidations from "@sitebender/toolsmith/monads/validation/combineValidations/index.ts"

type RegistrationForm = {
	readonly username: string
	readonly email: string
	readonly password: string
	readonly age: number
}

type ValidRegistrationForm = {
	readonly username: string
	readonly email: string
	readonly password: string
	readonly age: number
}

//++ Validates registration form data
//++ Accumulates ALL field errors, not just first one
export default function validateRegistrationForm(
	data: RegistrationForm,
): Validation<ValidationError, ValidRegistrationForm> {
	//++ Run all field validations in parallel
	const usernameValidation = _validateUsername(data.username)
	const emailValidation = _validateEmail(data.email)
	const passwordValidation = _validatePassword(data.password)
	const ageValidation = _validateAge(data.age)

	//++ Combine all validations
	//++ If ANY failed: accumulates ALL errors into NonEmptyArray
	//++ If ALL succeeded: returns valid form data
	return combineValidations([
		usernameValidation,
		emailValidation,
		passwordValidation,
		ageValidation,
	])
}

//++ Helper: Validate username
function _validateUsername(
	username: string,
): Validation<ValidationError, string> {
	if (username.length >= 3 && username.length <= 20) {
		return success(username)
	}

	return failure([
		{
			code: "USERNAME_INVALID_LENGTH",
			field: "username",
			messages: ["The system needs a username between 3 and 20 characters."],
			received: username,
			expected: "3-20 characters",
			suggestion: "Provide a username with valid length",
			severity: "requirement",
		},
	])
}

//++ Helper: Validate email
function _validateEmail(email: string): Validation<ValidationError, string> {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	if (emailPattern.test(email)) {
		return success(email)
	}

	return failure([
		{
			code: "EMAIL_INVALID_FORMAT",
			field: "email",
			messages: [
				"The system needs an email address in the format local@domain.extension.",
			],
			received: email,
			expected: "Valid email format",
			suggestion: "Provide an email like user@example.com",
			severity: "requirement",
			examples: ["user@example.com", "admin@site.org"],
		},
	])
}

//++ Helper: Validate password
function _validatePassword(
	password: string,
): Validation<ValidationError, string> {
	const errors: Array<ValidationError> = []

	if (password.length < 8) {
		errors.push({
			code: "PASSWORD_TOO_SHORT",
			field: "password",
			messages: ["The system needs a password at least 8 characters long."],
			received: password.length,
			expected: "At least 8 characters",
			suggestion: "Add more characters to meet minimum length",
			severity: "requirement",
		})
	}

	if (!/[A-Z]/.test(password)) {
		errors.push({
			code: "PASSWORD_MISSING_UPPERCASE",
			field: "password",
			messages: ["The system needs a password with at least one uppercase letter."],
			received: password,
			expected: "At least one uppercase letter (A-Z)",
			suggestion: "Add an uppercase letter to your password",
			severity: "requirement",
		})
	}

	if (!/[0-9]/.test(password)) {
		errors.push({
			code: "PASSWORD_MISSING_NUMBER",
			field: "password",
			messages: ["The system needs a password with at least one number."],
			received: password,
			expected: "At least one number (0-9)",
			suggestion: "Add a number to your password",
			severity: "requirement",
		})
	}

	if (errors.length > 0) {
		return failure(errors as [ValidationError, ...Array<ValidationError>])
	}

	return success(password)
}

//++ Helper: Validate age
function _validateAge(age: number): Validation<ValidationError, number> {
	if (age >= 13 && age <= 120) {
		return success(age)
	}

	return failure([
		{
			code: "AGE_OUT_OF_RANGE",
			field: "age",
			messages: ["The system needs an age between 13 and 120."],
			received: age,
			expected: "Number between 13 and 120",
			suggestion: "Provide a valid age",
			severity: "requirement",
			constraints: {
				min: 13,
				max: 120,
			},
		},
	])
}

//++ Usage examples:

//++ Success case: all fields valid
const validForm = validateRegistrationForm({
	username: "john_doe",
	email: "john@example.com",
	password: "SecurePass123",
	age: 25,
})
// validForm = Success {
//   _tag: "Success",
//   value: { username: "john_doe", email: "john@example.com", ... }
// }

//++ Error case: ALL fields invalid
const invalidForm = validateRegistrationForm({
	username: "ab", // Too short
	email: "invalid", // Bad format
	password: "weak", // Too short, missing uppercase and number
	age: 10, // Too young
})
// invalidForm = Failure {
//   _tag: "Failure",
//   errors: [
//     { code: "USERNAME_INVALID_LENGTH", field: "username", ... },
//     { code: "EMAIL_INVALID_FORMAT", field: "email", ... },
//     { code: "PASSWORD_TOO_SHORT", field: "password", ... },
//     { code: "PASSWORD_MISSING_UPPERCASE", field: "password", ... },
//     { code: "PASSWORD_MISSING_NUMBER", field: "password", ... },
//     { code: "AGE_OUT_OF_RANGE", field: "age", ... }
//   ]
// }
// Note: All 6 errors collected, user sees complete list
