import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BoardingPolicyTypeProps from "../../../../../types/Thing/BoardingPolicyType/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "../index.tsx"

// BoardingPolicyType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	BoardingPolicyTypeProps,
	"BoardingPolicyType",
	ExtractLevelProps<BoardingPolicyTypeProps, EnumerationProps>
>

export default function BoardingPolicyType({
	schemaType = "BoardingPolicyType",
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
