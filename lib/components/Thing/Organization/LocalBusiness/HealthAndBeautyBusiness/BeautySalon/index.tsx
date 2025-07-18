import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BeautySalonProps from "../../../../../../types/Thing/BeautySalon/index.ts"
import type HealthAndBeautyBusinessProps from "../../../../../../types/Thing/HealthAndBeautyBusiness/index.ts"

import HealthAndBeautyBusiness from "../index.tsx"

// BeautySalon adds no properties to the HealthAndBeautyBusiness schema type
export type Props = BaseComponentProps<
	BeautySalonProps,
	"BeautySalon",
	ExtractLevelProps<BeautySalonProps, HealthAndBeautyBusinessProps>
>

export default function BeautySalon({
	schemaType = "BeautySalon",
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
