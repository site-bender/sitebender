import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BodyOfWaterProps from "../../../../../../types/Thing/BodyOfWater/index.ts"
import type RiverBodyOfWaterProps from "../../../../../../types/Thing/RiverBodyOfWater/index.ts"

import BodyOfWater from "../index.tsx"

// RiverBodyOfWater adds no properties to the BodyOfWater schema type
export type Props = BaseComponentProps<
	RiverBodyOfWaterProps,
	"RiverBodyOfWater",
	ExtractLevelProps<RiverBodyOfWaterProps, BodyOfWaterProps>
>

export default function RiverBodyOfWater({
	schemaType = "RiverBodyOfWater",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<BodyOfWater
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
