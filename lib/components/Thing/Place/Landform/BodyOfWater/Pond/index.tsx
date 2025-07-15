import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BodyOfWaterProps from "../../../../../../types/Thing/BodyOfWater/index.ts"
import type PondProps from "../../../../../../types/Thing/Pond/index.ts"

import BodyOfWater from "./index.tsx"

// Pond adds no properties to the BodyOfWater schema type
export type Props = BaseComponentProps<
	PondProps,
	"Pond",
	ExtractLevelProps<PondProps, BodyOfWaterProps>
>

export default function Pond({
	schemaType = "Pond",
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
