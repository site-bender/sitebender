import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BodyOfWaterProps from "../../../../../../types/Thing/BodyOfWater/index.ts"
import type ReservoirProps from "../../../../../../types/Thing/Reservoir/index.ts"

import BodyOfWater from "../index.tsx"

// Reservoir adds no properties to the BodyOfWater schema type
export type Props = BaseComponentProps<
	ReservoirProps,
	"Reservoir",
	ExtractLevelProps<ReservoirProps, BodyOfWaterProps>
>

export default function Reservoir({
	schemaType = "Reservoir",
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
