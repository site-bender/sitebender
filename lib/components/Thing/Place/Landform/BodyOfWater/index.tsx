import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BodyOfWaterProps from "../../../../../types/Thing/BodyOfWater/index.ts"
import type LandformProps from "../../../../../types/Thing/Landform/index.ts"

import Landform from "./index.tsx"

// BodyOfWater adds no properties to the Landform schema type
export type Props = BaseComponentProps<
	BodyOfWaterProps,
	"BodyOfWater",
	ExtractLevelProps<BodyOfWaterProps, LandformProps>
>

export default function BodyOfWater({
	schemaType = "BodyOfWater",
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
