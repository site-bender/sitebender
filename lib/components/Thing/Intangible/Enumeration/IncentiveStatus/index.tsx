import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type IncentiveStatusProps from "../../../../../types/Thing/IncentiveStatus/index.ts"

import Enumeration from "../index.tsx"

// IncentiveStatus adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	IncentiveStatusProps,
	"IncentiveStatus",
	ExtractLevelProps<IncentiveStatusProps, EnumerationProps>
>

export default function IncentiveStatus({
	schemaType = "IncentiveStatus",
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
