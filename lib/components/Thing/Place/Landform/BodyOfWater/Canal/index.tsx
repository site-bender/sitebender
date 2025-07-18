import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BodyOfWaterProps from "../../../../../../types/Thing/BodyOfWater/index.ts"
import type CanalProps from "../../../../../../types/Thing/Canal/index.ts"

import BodyOfWater from "../index.tsx"

// Canal adds no properties to the BodyOfWater schema type
export type Props = BaseComponentProps<
	CanalProps,
	"Canal",
	ExtractLevelProps<CanalProps, BodyOfWaterProps>
>

export default function Canal({
	schemaType = "Canal",
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
