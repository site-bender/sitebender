import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LandformProps from "../../../../../types/Thing/Landform/index.ts"
import type VolcanoProps from "../../../../../types/Thing/Volcano/index.ts"

import Landform from "../index.tsx"

// Volcano adds no properties to the Landform schema type
export type Props = BaseComponentProps<
	VolcanoProps,
	"Volcano",
	ExtractLevelProps<VolcanoProps, LandformProps>
>

export default function Volcano({
	schemaType = "Volcano",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Landform
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
