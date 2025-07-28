import type BaseProps from "../../../../../types/index.ts"
import type { ApartmentProps } from "../../../../../types/Thing/Place/Accommodation/Apartment/index.ts"

import Accommodation from "../index.tsx"

export type Props = ApartmentProps & BaseProps

export default function Apartment({
	numberOfRooms,
	occupancy,
	_type = "Apartment",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Accommodation
			{...props}
			_type={_type}
			subtypeProperties={{
				numberOfRooms,
				occupancy,
				...subtypeProperties,
			}}
		/>
	)
}
