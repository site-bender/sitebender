import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type PublicToiletProps from "../../../../../types/Thing/PublicToilet/index.ts"

import CivicStructure from "../index.tsx"

// PublicToilet adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	PublicToiletProps,
	"PublicToilet",
	ExtractLevelProps<PublicToiletProps, CivicStructureProps>
>

export default function PublicToilet({
	schemaType = "PublicToilet",
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
