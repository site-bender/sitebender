import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { PlaceProps } from "../../../../../types/Thing/Place/index.ts"
import type { AccommodationProps } from "../../../../../types/Thing/Place/Accommodation/index.ts"
import type { SuiteProps } from "../../../../../types/Thing/Place/Accommodation/Suite/index.ts"

import Accommodation from "../index.tsx"

export type Props = BaseComponentProps<
	SuiteProps,
	"Suite",
	ExtractLevelProps<ThingProps, PlaceProps, AccommodationProps>
>

export default function Suite({
	bed,
	numberOfRooms,
	occupancy,
	schemaType = "Suite",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Accommodation
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				bed,
				numberOfRooms,
				occupancy,
				...subtypeProperties,
			}}
		/>
	)
}
