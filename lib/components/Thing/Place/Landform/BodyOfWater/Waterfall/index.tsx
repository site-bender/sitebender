import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BodyOfWaterProps from "../../../../../../types/Thing/BodyOfWater/index.ts"
import type WaterfallProps from "../../../../../../types/Thing/Waterfall/index.ts"

import BodyOfWater from "./index.tsx"

// Waterfall adds no properties to the BodyOfWater schema type
export type Props = BaseComponentProps<
	WaterfallProps,
	"Waterfall",
	ExtractLevelProps<WaterfallProps, BodyOfWaterProps>
>

export default function Waterfall({
	schemaType = "Waterfall",
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
