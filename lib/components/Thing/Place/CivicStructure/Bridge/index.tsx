import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BridgeProps from "../../../../../types/Thing/Bridge/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"

import CivicStructure from "../index.tsx"

// Bridge adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	BridgeProps,
	"Bridge",
	ExtractLevelProps<BridgeProps, CivicStructureProps>
>

export default function Bridge({
	schemaType = "Bridge",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CivicStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
