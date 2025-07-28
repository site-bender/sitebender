import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { PlaceProps } from "../../../../../../types/Thing/Place/index.ts"
import type { AccommodationProps } from "../../../../../../types/Thing/Place/Accommodation/index.ts"
import type { HouseProps } from "../../../../../../types/Thing/Place/Accommodation/House/index.ts"
import type { SingleFamilyResidenceProps } from "../../../../../../types/Thing/Place/Accommodation/House/SingleFamilyResidence/index.ts"

import House from "../index.tsx"

export type Props = BaseComponentProps<
	SingleFamilyResidenceProps,
	"SingleFamilyResidence",
	ExtractLevelProps<ThingProps, PlaceProps, AccommodationProps, HouseProps>
>

export default function SingleFamilyResidence({
	numberOfRooms,
	occupancy,
	schemaType = "SingleFamilyResidence",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<House
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				numberOfRooms,
				occupancy,
				...subtypeProperties,
			}}
		/>
	)
}
