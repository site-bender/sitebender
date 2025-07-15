import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MosqueProps from "../../../../../../types/Thing/Mosque/index.ts"
import type PlaceOfWorshipProps from "../../../../../../types/Thing/PlaceOfWorship/index.ts"

import PlaceOfWorship from "./index.tsx"

// Mosque adds no properties to the PlaceOfWorship schema type
export type Props = BaseComponentProps<
	MosqueProps,
	"Mosque",
	ExtractLevelProps<MosqueProps, PlaceOfWorshipProps>
>

export default function Mosque({
	schemaType = "Mosque",
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
