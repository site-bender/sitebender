import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DaySpaProps from "../../../../../../types/Thing/DaySpa/index.ts"
import type HealthAndBeautyBusinessProps from "../../../../../../types/Thing/HealthAndBeautyBusiness/index.ts"

import HealthAndBeautyBusiness from "./index.tsx"

// DaySpa adds no properties to the HealthAndBeautyBusiness schema type
export type Props = BaseComponentProps<
	DaySpaProps,
	"DaySpa",
	ExtractLevelProps<DaySpaProps, HealthAndBeautyBusinessProps>
>

export default function DaySpa({
	schemaType = "DaySpa",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<HealthAndBeautyBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
