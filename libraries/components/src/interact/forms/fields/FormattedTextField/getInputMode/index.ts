import type { InputFormat } from "../index.tsx"

/**
 * Determines the appropriate inputmode attribute for better mobile keyboard experience
 */
export default function getInputMode(format?: InputFormat): string | undefined {
	switch (format) {
		case "creditCard":
		case "zipPlus4":
		case "ssn":
		case "tin":
		case "bankAccount":
		case "vin":
		case "isbn":
		case "isbn10":
		case "isbn13":
		case "healthInsurance":
		case "driversLicense":
		case "serialNumber":
		case "trackingNumber":
		case "expirationDate":
			return "numeric"
		case "postalCode":
			return "text" // Mixed alphanumeric in many countries
		case "iban":
		case "passport":
		case "nin":
		case "ipAddressV4":
		case "ipAddressV6":
		case "macAddress":
			return "text"
		default:
			return undefined
	}
}
