import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AccommodationProps from "../../../../../types/Thing/Accommodation/index.ts"
import type HouseProps from "../../../../../types/Thing/House/index.ts"

import Accommodation from "./index.tsx"

export type Props = BaseComponentProps<
	HouseProps,
	"House",
	ExtractLevelProps<HouseProps, AccommodationProps>
>

export default function House(
	{
		numberOfRooms,
		schemaType = "House",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
