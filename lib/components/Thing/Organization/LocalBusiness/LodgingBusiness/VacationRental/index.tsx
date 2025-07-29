import type BaseProps from "../../../../../../types/index.ts"
import type VacationRentalProps from "../../../../../../types/Thing/Organization/LocalBusiness/LodgingBusiness/VacationRental/index.ts"

import LodgingBusiness from "../index.tsx"

export type Props = VacationRentalProps & BaseProps

export default function VacationRental({
	_type = "VacationRental",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LodgingBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
