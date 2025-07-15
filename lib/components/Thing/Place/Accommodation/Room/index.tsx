import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AccommodationProps from "../../../../../types/Thing/Accommodation/index.ts"
import type RoomProps from "../../../../../types/Thing/Room/index.ts"

import Accommodation from "./index.tsx"

// Room adds no properties to the Accommodation schema type
export type Props = BaseComponentProps<
	RoomProps,
	"Room",
	ExtractLevelProps<RoomProps, AccommodationProps>
>

export default function Room({
	schemaType = "Room",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Accommodation
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
