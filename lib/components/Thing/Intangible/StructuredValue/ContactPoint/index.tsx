import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { ContactPointProps } from "../../../../../types/Thing/Intangible/StructuredValue/ContactPoint/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	ContactPointProps,
	"ContactPoint",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

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
	schemaType = "ContactPoint",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
		/>
	)
}
