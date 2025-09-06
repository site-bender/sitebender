import type { CountryCode } from "../../../../../types/components/formats/index.ts"

// ...existing code...
import generateShortId from "../../../../helpers/generateShortId/index.ts"
import LabelWrapper from "../../composites/LabelWrapper/index.tsx"
import Input from "../../elements/Input/index.tsx"
import getInputMode from "./getInputMode/index.ts"

export type InputFormat =
	| "creditCard"
	| "zipPlus4"
	| "ssn"
	| "tin"
	| "passport"
	| "bankAccount"
	| "iban"
	| "vin"
	| "postalCode"
	| "ipAddressV4"
	| "ipAddressV6"
	| "macAddress"
	| "isbn"
	| "isbn10"
	| "isbn13"
	| "expirationDate"
	| "healthInsurance"
	| "driversLicense"
	| "nin"
	| "serialNumber"
	| "trackingNumber"

export type Props =
	& Omit<
		JSX.InputHTMLAttributes<HTMLInputElement>,
		"placeholder"
	>
	& {
		countryCode?: CountryCode
		format?: InputFormat
		help?: string
		label?: string
		name: string
		pattern?: string
		required?: boolean
		submitFormatted?: boolean
	}

export default function FormattedTextField({
	countryCode,
	format,
	help = "Enter text",
	id = generateShortId(),
	label = "Text",
	name = "text",
	pattern = ".*",
	required = false,
	submitFormatted = false,
	value,
	...props
}: Props) {
	const formattedId = `${id}-formatted`
	const unformattedId = `${id}-unformatted`
	const inputMode = getInputMode(format)

	return (
		<LabelWrapper
			classes={["form-field", "formatted-field"]}
			help={help}
			id={id}
			label={label}
		>
			<Input
				data-country-code={countryCode}
				data-format={format}
				data-submit-formatted={submitFormatted}
				id={formattedId}
				inputMode={inputMode}
				pattern={pattern}
				required={required}
				type="text"
				{...props}
			/>
			<input
				type="hidden"
				id={unformattedId}
				name={name}
				value={value as string}
			/>
		</LabelWrapper>
	)
}
