import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ContactPointProps from "../../../../../../types/Thing/ContactPoint/index.ts"
import type PostalAddressProps from "../../../../../../types/Thing/PostalAddress/index.ts"

import ContactPoint from "../index.tsx"

export type Props = BaseComponentProps<
	PostalAddressProps,
	"PostalAddress",
	ExtractLevelProps<PostalAddressProps, ContactPointProps>
>

export default function PostalAddress(
	{
		addressCountry,
		addressLocality,
		addressRegion,
		extendedAddress,
		postOfficeBoxNumber,
		postalCode,
		streetAddress,
		schemaType = "PostalAddress",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<ContactPoint
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				addressCountry,
				addressLocality,
				addressRegion,
				extendedAddress,
				postOfficeBoxNumber,
				postalCode,
				streetAddress,
				...subtypeProperties,
			}}
		/>
	)
}
