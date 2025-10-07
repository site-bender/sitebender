//++ Maximum safe integer value in JavaScript
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER

//++ Minimum safe integer value in JavaScript
export const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER

//++ Number of decimal places for TwoDecimalPlaces type
export const TWO_DECIMAL_PLACES_SCALE = 2

//++ Number of decimal places for OneDecimalPlace type
export const ONE_DECIMAL_PLACE_SCALE = 1

//++ Number of decimal places for ThreeDecimalPlaces type
export const THREE_DECIMAL_PLACES_SCALE = 3

//++ Number of decimal places for FourDecimalPlaces type
export const FOUR_DECIMAL_PLACES_SCALE = 4

//++ Number of decimal places for EightDecimalPlaces type
export const EIGHT_DECIMAL_PLACES_SCALE = 8

//++ Minimum percent value (0%)
export const PERCENT_MIN = 0

//++ Maximum percent value (100% as 1.0)
export const PERCENT_MAX = 1

//++ Number of decimal places for Percent type
export const PERCENT_SCALE = 4

//++ Maximum length for complete email address
export const EMAIL_ADDRESS_MAX_LENGTH = 254

//++ Maximum length for email local part (before @)
export const EMAIL_ADDRESS_LOCAL_MAX_LENGTH = 64

//++ Maximum length for email domain part (after @)
export const EMAIL_ADDRESS_DOMAIN_MAX_LENGTH = 253

//++ Maximum length for each domain label
export const EMAIL_ADDRESS_DOMAIN_LABEL_MAX_LENGTH = 63

//++ Maximum length for complete URL (browser standard)
export const URL_MAX_LENGTH = 2048

//++ Maximum length for complete URI (same as URL)
export const URI_MAX_LENGTH = 2048

//++ Maximum length for URI scheme
export const URI_SCHEME_MAX_LENGTH = 64

//++ Maximum length for URL domain part
export const URL_DOMAIN_MAX_LENGTH = 253

//++ Maximum length for each URL domain label
export const URL_DOMAIN_LABEL_MAX_LENGTH = 63

//++ Minimum valid port number
export const URL_PORT_MIN = 1

//++ Maximum valid port number
export const URL_PORT_MAX = 65535

//++ Maximum length for complete IRI (larger than URI due to Unicode)
export const IRI_MAX_LENGTH = 8192

//++ Maximum length for IRI scheme
export const IRI_SCHEME_MAX_LENGTH = 64

//++ Maximum length for standalone domain name per RFC 1035
export const DOMAIN_MAX_LENGTH = 253

//++ Maximum length for each domain label per RFC 1035
export const DOMAIN_LABEL_MAX_LENGTH = 63

//++ UUID total length including hyphens per RFC 4122
export const UUID_LENGTH = 36

//++ UUID hyphen positions (0-indexed)
export const UUID_HYPHEN_POSITIONS = [8, 13, 18, 23] as const

//++ UUID segment definitions for validation
export const UUID_SEGMENTS = [
	{ start: 0, end: 8, length: 8, name: "first" },
	{ start: 9, end: 13, length: 4, name: "second" },
	{ start: 14, end: 18, length: 4, name: "third" },
	{ start: 19, end: 23, length: 4, name: "fourth" },
	{ start: 24, end: 36, length: 12, name: "fifth" },
] as const
