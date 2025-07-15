import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type LodgingBusinessProps from "../../../../../../types/Thing/LodgingBusiness/index.ts"
import type VacationRentalProps from "../../../../../../types/Thing/VacationRental/index.ts"

import LodgingBusiness from "./index.tsx"

// VacationRental adds no properties to the LodgingBusiness schema type
export type Props = BaseComponentProps<
	VacationRentalProps,
	"VacationRental",
	ExtractLevelProps<VacationRentalProps, LodgingBusinessProps>
>

export default function VacationRental({
	schemaType = "VacationRental",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LodgingBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
