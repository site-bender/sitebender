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

//++ IPv4 octet maximum value (0-255)
export const IPV4_OCTET_MAX = 255

//++ Number of octets in IPv4 address
export const IPV4_OCTETS_COUNT = 4

//++ Number of groups in IPv6 address
export const IPV6_GROUPS_COUNT = 8

//++ Number of IPv6 groups when IPv4 is embedded
export const IPV6_GROUPS_WITH_IPV4_COUNT = 6

//++ Maximum hexadecimal digits per IPv6 group
export const IPV6_GROUP_HEX_DIGITS_MAX = 4

//++ Maximum value for IPv6 group (0x0000-0xFFFF)
export const IPV6_GROUP_VALUE_MAX = 0xffff

//++ Base for hexadecimal number parsing
export const HEX_BASE = 16

//++ Base for decimal number parsing
export const DECIMAL_BASE = 10

//++ Number of bits in a byte
export const BYTE_BITS = 8

//++ Length of ISBN-10 string (10 characters)
export const ISBN10_LENGTH = 10

//++ Valid characters for ISBN-10 (digits 0-9 and X for check digit)
export const ISBN10_VALID_CHARS = "0123456789X"

//++ Position of check digit in ISBN-10 (0-indexed, last character)
export const ISBN10_CHECK_DIGIT_POSITION = 9

//++ Weights for ISBN-10 checksum calculation (positions 1-10)
export const ISBN10_WEIGHTS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] as const

//++ Modulus for ISBN-10 checksum calculation
export const ISBN10_CHECKSUM_MODULUS = 11

//++ Length of ISBN-13 string (13 characters)
export const ISBN13_LENGTH = 13

//++ Valid characters for ISBN-13 (digits 0-9)
export const ISBN13_VALID_CHARS = "0123456789"

//++ Position of check digit in ISBN-13 (0-indexed, last character)
export const ISBN13_CHECK_DIGIT_POSITION = 12

//++ Weights for ISBN-13 checksum calculation (positions 1-13, alternating 1,3)
export const ISBN13_WEIGHTS = [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1] as const

//++ Modulus for ISBN-13 checksum calculation
export const ISBN13_CHECKSUM_MODULUS = 10

//++ Valid ISBN-13 prefixes (978 and 979)
export const ISBN13_VALID_PREFIXES = ["978", "979"] as const

//++ Length of 5-digit US ZIP code
export const POSTAL_CODE_ZIP5_LENGTH = 5

//++ Length of 9-digit US ZIP code (ZIP+4)
export const POSTAL_CODE_ZIP9_LENGTH = 9

//++ Length of 10-digit US ZIP code with hyphen (ZIP+4 format)
export const POSTAL_CODE_ZIP10_LENGTH = 10

//++ Valid characters for US ZIP codes (digits 0-9)
export const POSTAL_CODE_VALID_CHARS = "0123456789"

//++ Position of hyphen in ZIP+4 format (after 5 digits)
export const POSTAL_CODE_HYPHEN_POSITION = 5

//++ Length of US phone number (10 digits)
export const PHONE_NUMBER_LENGTH = 10

//++ Length of US phone number with parentheses and hyphen: (123) 456-7890
export const PHONE_NUMBER_PARENTHESES_LENGTH = 14

//++ Length of US phone number with hyphens: 123-456-7890
export const PHONE_NUMBER_HYPHENATED_LENGTH = 12

//++ Length of US phone number with +1 prefix: +1-123-456-7890
export const PHONE_NUMBER_INTERNATIONAL_LENGTH = 15

//++ Valid characters for US phone numbers (digits 0-9)
export const PHONE_NUMBER_VALID_CHARS = "0123456789"

//++ Position of opening parenthesis in (123) format
export const PHONE_NUMBER_OPEN_PAREN_POSITION = 0

//++ Position of closing parenthesis in (123) format
export const PHONE_NUMBER_CLOSE_PAREN_POSITION = 4

//++ Position of space after closing parenthesis
export const PHONE_NUMBER_SPACE_POSITION = 5

//++ Position of hyphen in (123) 456-7890 format
export const PHONE_NUMBER_PARENTHESES_HYPHEN_POSITION = 9

//++ Position of first hyphen in 123-456-7890 format
export const PHONE_NUMBER_FIRST_HYPHEN_POSITION = 3

//++ Position of second hyphen in 123-456-7890 format
export const PHONE_NUMBER_SECOND_HYPHEN_POSITION = 7

//++ Position of first hyphen in +1-123-456-7890 format
export const PHONE_NUMBER_INTERNATIONAL_FIRST_HYPHEN_POSITION = 2

//++ Position of second hyphen in +1-123-456-7890 format
export const PHONE_NUMBER_INTERNATIONAL_SECOND_HYPHEN_POSITION = 6

//++ Position of third hyphen in +1-123-456-7890 format
export const PHONE_NUMBER_INTERNATIONAL_THIRD_HYPHEN_POSITION = 10
