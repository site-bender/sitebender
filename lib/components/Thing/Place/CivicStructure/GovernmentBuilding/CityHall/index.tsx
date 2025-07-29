import type BaseProps from "../../../../../../types/index.ts"
import type CityHallProps from "../../../../../../types/Thing/Place/CivicStructure/GovernmentBuilding/CityHall/index.ts"

import GovernmentBuilding from "../index.tsx"

export type Props = CityHallProps & BaseProps

export default function CityHall({
	_type = "CityHall",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<GovernmentBuilding
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
