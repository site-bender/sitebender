export type CardType =
	| "visa"
	| "mastercard"
	| "amex"
	| "discover"
	| "diners"
	| "jcb"

export type CreditCardOptions = {
	cardType?: CardType
}
