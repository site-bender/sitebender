import type BaseProps from "../../../../../../types/index.ts"
import type { SingleFamilyResidenceProps } from "../../../../../../types/Thing/Place/Accommodation/House/SingleFamilyResidence/index.ts"

import House from "../index.tsx"

export type Props = SingleFamilyResidenceProps & BaseProps

export default function SingleFamilyResidence({
	numberOfRooms,
	occupancy,
	_type = "SingleFamilyResidence",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<House
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
