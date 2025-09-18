import type { CardType } from "../types/index.ts"

//++ Credit card patterns and length bounds for supported card brands
export const CARD_TYPE_PATTERNS: Record<CardType, RegExp> = {
	visa: /^4\d{12}(\d{3})?$/,
	mastercard:
		/^(5[1-5]\d{14}|2(22[1-9]|2[3-9]\d|[3-6]\d{2}|7[0-1]\d|720)\d{12})$/,
	amex: /^3[47]\d{13}$/,
	discover: /^(6011|64[4-9]|65)\d{12,15}$/,
	diners: /^(30[0-5]|36|38)\d{11,12}$/,
	jcb: /^35(2[89]|[3-8]\d)\d{12}$/,
}

//++ Minimum and maximum credit card number length (digits)
export const MIN_CARD_LENGTH = 13
export const MAX_CARD_LENGTH = 19
