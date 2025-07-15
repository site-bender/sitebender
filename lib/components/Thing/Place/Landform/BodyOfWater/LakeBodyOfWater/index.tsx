import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BodyOfWaterProps from "../../../../../../types/Thing/BodyOfWater/index.ts"
import type LakeBodyOfWaterProps from "../../../../../../types/Thing/LakeBodyOfWater/index.ts"

import BodyOfWater from "./index.tsx"

// LakeBodyOfWater adds no properties to the BodyOfWater schema type
export type Props = BaseComponentProps<
	LakeBodyOfWaterProps,
	"LakeBodyOfWater",
	ExtractLevelProps<LakeBodyOfWaterProps, BodyOfWaterProps>
>

export default function LakeBodyOfWater({
	schemaType = "LakeBodyOfWater",
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
