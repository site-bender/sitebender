import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BeachProps from "../../../../../types/Thing/Beach/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"

import CivicStructure from "../index.tsx"

// Beach adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	BeachProps,
	"Beach",
	ExtractLevelProps<BeachProps, CivicStructureProps>
>

export default function Beach({
	schemaType = "Beach",
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
