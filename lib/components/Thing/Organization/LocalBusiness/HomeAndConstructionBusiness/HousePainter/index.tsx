import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HomeAndConstructionBusinessProps from "../../../../../../types/Thing/HomeAndConstructionBusiness/index.ts"
import type HousePainterProps from "../../../../../../types/Thing/HousePainter/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

// HousePainter adds no properties to the HomeAndConstructionBusiness schema type
export type Props = BaseComponentProps<
	HousePainterProps,
	"HousePainter",
	ExtractLevelProps<HousePainterProps, HomeAndConstructionBusinessProps>
>

export default function HousePainter({
	schemaType = "HousePainter",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<HomeAndConstructionBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
