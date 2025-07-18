import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CityHallProps from "../../../../../../types/Thing/CityHall/index.ts"
import type GovernmentBuildingProps from "../../../../../../types/Thing/GovernmentBuilding/index.ts"

import GovernmentBuilding from "../index.tsx"

// CityHall adds no properties to the GovernmentBuilding schema type
export type Props = BaseComponentProps<
	CityHallProps,
	"CityHall",
	ExtractLevelProps<CityHallProps, GovernmentBuildingProps>
>

export default function CityHall({
	schemaType = "CityHall",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<GovernmentBuilding
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
