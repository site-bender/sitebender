import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type MuseumProps from "../../../../../types/Thing/Museum/index.ts"

import CivicStructure from "../index.tsx"

// Museum adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	MuseumProps,
	"Museum",
	ExtractLevelProps<MuseumProps, CivicStructureProps>
>

export default function Museum({
	schemaType = "Museum",
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
