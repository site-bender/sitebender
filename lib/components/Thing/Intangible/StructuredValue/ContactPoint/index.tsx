import type BaseProps from "../../../../../types/index.ts"
import type ContactPointProps from "../../../../../types/Thing/Intangible/StructuredValue/ContactPoint/index.ts"

import StructuredValue from "../index.tsx"

export type Props = ContactPointProps & BaseProps

export default function ContactPoint({
	areaServed,
	availableLanguage,
	contactOption,
	contactType,
	email,
	faxNumber,
	hoursAvailable,
	productSupported,
	serviceArea,
	telephone,
	_type = "ContactPoint",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				areaServed,
				availableLanguage,
				contactOption,
				contactType,
				email,
				faxNumber,
				hoursAvailable,
				productSupported,
				serviceArea,
				telephone,
				...subtypeProperties,
			}}
		>{children}</StructuredValue>
	)
}
