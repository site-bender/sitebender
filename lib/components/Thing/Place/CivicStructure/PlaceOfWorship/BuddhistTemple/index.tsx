import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BuddhistTempleProps from "../../../../../../types/Thing/BuddhistTemple/index.ts"
import type PlaceOfWorshipProps from "../../../../../../types/Thing/PlaceOfWorship/index.ts"

import PlaceOfWorship from "../index.tsx"

// BuddhistTemple adds no properties to the PlaceOfWorship schema type
export type Props = BaseComponentProps<
	BuddhistTempleProps,
	"BuddhistTemple",
	ExtractLevelProps<BuddhistTempleProps, PlaceOfWorshipProps>
>

export default function BuddhistTemple({
	schemaType = "BuddhistTemple",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<PlaceOfWorship
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
