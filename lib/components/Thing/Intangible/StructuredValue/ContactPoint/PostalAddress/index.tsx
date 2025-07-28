import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { ContactPointProps } from "../../../../../../types/Thing/Intangible/StructuredValue/ContactPoint/index.ts"
import type { PostalAddressProps } from "../../../../../../types/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"

import ContactPoint from "../index.tsx"

export type Props = BaseComponentProps<
	PostalAddressProps,
	"PostalAddress",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps, ContactPointProps>
>

export default function PostalAddress({
	addressCountry,
	addressLocality,
	addressRegion,
	extendedAddress,
	postalCode,
	postOfficeBoxNumber,
	streetAddress,
	schemaType = "PostalAddress",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<ContactPoint
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				addressCountry,
				addressLocality,
				addressRegion,
				extendedAddress,
				postalCode,
				postOfficeBoxNumber,
				streetAddress,
				...subtypeProperties,
			}}
		/>
	)
}
