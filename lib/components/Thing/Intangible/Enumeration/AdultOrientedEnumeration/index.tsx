import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AdultOrientedEnumerationProps from "../../../../../types/Thing/AdultOrientedEnumeration/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "../index.tsx"

// AdultOrientedEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	AdultOrientedEnumerationProps,
	"AdultOrientedEnumeration",
	ExtractLevelProps<AdultOrientedEnumerationProps, EnumerationProps>
>

export default function AdultOrientedEnumeration({
	schemaType = "AdultOrientedEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
