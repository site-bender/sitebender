import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type ZooProps from "../../../../../types/Thing/Zoo/index.ts"

import CivicStructure from "./index.tsx"

// Zoo adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	ZooProps,
	"Zoo",
	ExtractLevelProps<ZooProps, CivicStructureProps>
>

export default function Zoo({
	schemaType = "Zoo",
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
