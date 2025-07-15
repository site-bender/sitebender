import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type ReturnLabelSourceEnumerationProps from "../../../../../types/Thing/ReturnLabelSourceEnumeration/index.ts"

import Enumeration from "./index.tsx"

// ReturnLabelSourceEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	ReturnLabelSourceEnumerationProps,
	"ReturnLabelSourceEnumeration",
	ExtractLevelProps<ReturnLabelSourceEnumerationProps, EnumerationProps>
>

export default function ReturnLabelSourceEnumeration({
	schemaType = "ReturnLabelSourceEnumeration",
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
