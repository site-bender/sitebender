import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BodyOfWaterProps from "../../../../../../types/Thing/BodyOfWater/index.ts"
import type OceanBodyOfWaterProps from "../../../../../../types/Thing/OceanBodyOfWater/index.ts"

import BodyOfWater from "./index.tsx"

// OceanBodyOfWater adds no properties to the BodyOfWater schema type
export type Props = BaseComponentProps<
	OceanBodyOfWaterProps,
	"OceanBodyOfWater",
	ExtractLevelProps<OceanBodyOfWaterProps, BodyOfWaterProps>
>

export default function OceanBodyOfWater({
	schemaType = "OceanBodyOfWater",
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
