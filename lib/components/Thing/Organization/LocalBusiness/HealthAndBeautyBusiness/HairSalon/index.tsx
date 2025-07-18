import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HairSalonProps from "../../../../../../types/Thing/HairSalon/index.ts"
import type HealthAndBeautyBusinessProps from "../../../../../../types/Thing/HealthAndBeautyBusiness/index.ts"

import HealthAndBeautyBusiness from "../index.tsx"

// HairSalon adds no properties to the HealthAndBeautyBusiness schema type
export type Props = BaseComponentProps<
	HairSalonProps,
	"HairSalon",
	ExtractLevelProps<HairSalonProps, HealthAndBeautyBusinessProps>
>

export default function HairSalon({
	schemaType = "HairSalon",
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
