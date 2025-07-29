import type BaseProps from "../../../../../../types/index.ts"
import type PostalAddressProps from "../../../../../../types/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"

import ContactPoint from "../index.tsx"

export type Props = PostalAddressProps & BaseProps

export default function PostalAddress({
	addressCountry,
	addressLocality,
	addressRegion,
	extendedAddress,
	postalCode,
	postOfficeBoxNumber,
	streetAddress,
	_type = "PostalAddress",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ContactPoint
			{...props}
			_type={_type}
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
