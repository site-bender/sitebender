import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { PlaceProps } from "../../../../../types/Thing/Place/index.ts"
import type { AccommodationProps } from "../../../../../types/Thing/Place/Accommodation/index.ts"
import type { HouseProps } from "../../../../../types/Thing/Place/Accommodation/House/index.ts"

import Accommodation from "../index.tsx"

export type Props = BaseComponentProps<
	HouseProps,
	"House",
	ExtractLevelProps<ThingProps, PlaceProps, AccommodationProps>
>

export default function House({
	numberOfRooms,
	schemaType = "House",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Accommodation
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				numberOfRooms,
				...subtypeProperties,
			}}
		/>
	)
}
