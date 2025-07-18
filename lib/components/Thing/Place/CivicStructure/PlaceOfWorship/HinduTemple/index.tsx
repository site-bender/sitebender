import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HinduTempleProps from "../../../../../../types/Thing/HinduTemple/index.ts"
import type PlaceOfWorshipProps from "../../../../../../types/Thing/PlaceOfWorship/index.ts"

import PlaceOfWorship from "../index.tsx"

// HinduTemple adds no properties to the PlaceOfWorship schema type
export type Props = BaseComponentProps<
	HinduTempleProps,
	"HinduTemple",
	ExtractLevelProps<HinduTempleProps, PlaceOfWorshipProps>
>

export default function HinduTemple({
	schemaType = "HinduTemple",
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
