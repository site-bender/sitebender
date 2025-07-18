import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CemeteryProps from "../../../../../types/Thing/Cemetery/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"

import CivicStructure from "../index.tsx"

// Cemetery adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	CemeteryProps,
	"Cemetery",
	ExtractLevelProps<CemeteryProps, CivicStructureProps>
>

export default function Cemetery({
	schemaType = "Cemetery",
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
