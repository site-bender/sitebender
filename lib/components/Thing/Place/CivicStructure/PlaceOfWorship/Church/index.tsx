import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ChurchProps from "../../../../../../types/Thing/Church/index.ts"
import type PlaceOfWorshipProps from "../../../../../../types/Thing/PlaceOfWorship/index.ts"

import PlaceOfWorship from "./index.tsx"

// Church adds no properties to the PlaceOfWorship schema type
export type Props = BaseComponentProps<
	ChurchProps,
	"Church",
	ExtractLevelProps<ChurchProps, PlaceOfWorshipProps>
>

export default function Church({
	schemaType = "Church",
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
