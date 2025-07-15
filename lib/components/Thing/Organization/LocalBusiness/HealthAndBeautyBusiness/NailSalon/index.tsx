import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HealthAndBeautyBusinessProps from "../../../../../../types/Thing/HealthAndBeautyBusiness/index.ts"
import type NailSalonProps from "../../../../../../types/Thing/NailSalon/index.ts"

import HealthAndBeautyBusiness from "./index.tsx"

// NailSalon adds no properties to the HealthAndBeautyBusiness schema type
export type Props = BaseComponentProps<
	NailSalonProps,
	"NailSalon",
	ExtractLevelProps<NailSalonProps, HealthAndBeautyBusinessProps>
>

export default function NailSalon({
	schemaType = "NailSalon",
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
