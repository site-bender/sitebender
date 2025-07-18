import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type StatusEnumerationProps from "../../../../../types/Thing/StatusEnumeration/index.ts"

import Enumeration from "../index.tsx"

// StatusEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	StatusEnumerationProps,
	"StatusEnumeration",
	ExtractLevelProps<StatusEnumerationProps, EnumerationProps>
>

export default function StatusEnumeration({
	schemaType = "StatusEnumeration",
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
