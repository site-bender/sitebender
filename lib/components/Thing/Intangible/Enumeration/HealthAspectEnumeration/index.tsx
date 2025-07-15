import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type HealthAspectEnumerationProps from "../../../../../types/Thing/HealthAspectEnumeration/index.ts"

import Enumeration from "./index.tsx"

// HealthAspectEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	HealthAspectEnumerationProps,
	"HealthAspectEnumeration",
	ExtractLevelProps<HealthAspectEnumerationProps, EnumerationProps>
>

export default function HealthAspectEnumeration({
	schemaType = "HealthAspectEnumeration",
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
