import type { PhoneNumber } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a string is a valid E.164 phone number
//++ E.164 format: +[1-3 digit country code][4-14 digit number]
//++ Total length: 7-17 characters (+ plus country code plus number)
export default function isPhoneNumber(value: string): value is PhoneNumber {
	//++ [EXCEPTION] typeof, !==, and .test() permitted in Toolsmith for performance - provides E.164 phone validation wrapper
	if (typeof value !== "string") {
		return false
	}

	//++ [EXCEPTION] Using regex for E.164 validation
	//++ Pattern: + followed by 1-3 digits (country code) followed by 4-14 digits (number)
	const e164Pattern = /^\+[1-9]\d{0,2}\d{4,14}$/

	return e164Pattern.test(value)
}
