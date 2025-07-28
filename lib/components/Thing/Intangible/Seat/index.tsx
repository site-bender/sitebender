import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { SeatProps } from "../../../../types/Thing/Intangible/Seat/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	SeatProps,
	"Seat",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function Seat({
	seatingType,
	seatNumber,
	seatRow,
	seatSection,
	schemaType = "Seat",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				seatingType,
				seatNumber,
				seatRow,
				seatSection,
				...subtypeProperties,
			}}
		/>
	)
}
