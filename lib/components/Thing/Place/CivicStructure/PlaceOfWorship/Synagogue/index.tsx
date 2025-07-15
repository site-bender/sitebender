import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type PlaceOfWorshipProps from "../../../../../../types/Thing/PlaceOfWorship/index.ts"
import type SynagogueProps from "../../../../../../types/Thing/Synagogue/index.ts"

import PlaceOfWorship from "./index.tsx"

// Synagogue adds no properties to the PlaceOfWorship schema type
export type Props = BaseComponentProps<
	SynagogueProps,
	"Synagogue",
	ExtractLevelProps<SynagogueProps, PlaceOfWorshipProps>
>

export default function Synagogue({
	schemaType = "Synagogue",
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
