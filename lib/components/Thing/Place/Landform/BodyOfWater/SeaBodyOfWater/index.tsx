import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BodyOfWaterProps from "../../../../../../types/Thing/BodyOfWater/index.ts"
import type SeaBodyOfWaterProps from "../../../../../../types/Thing/SeaBodyOfWater/index.ts"

import BodyOfWater from "../index.tsx"

// SeaBodyOfWater adds no properties to the BodyOfWater schema type
export type Props = BaseComponentProps<
	SeaBodyOfWaterProps,
	"SeaBodyOfWater",
	ExtractLevelProps<SeaBodyOfWaterProps, BodyOfWaterProps>
>

export default function SeaBodyOfWater({
	schemaType = "SeaBodyOfWater",
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
