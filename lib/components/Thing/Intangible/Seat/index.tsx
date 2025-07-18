import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type SeatProps from "../../../../types/Thing/Seat/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	SeatProps,
	"Seat",
	ExtractLevelProps<SeatProps, IntangibleProps>
>

export default function Seat(
	{
		seatNumber,
		seatRow,
		seatSection,
		seatingType,
		schemaType = "Seat",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				seatNumber,
				seatRow,
				seatSection,
				seatingType,
				...subtypeProperties,
			}}
		/>
	)
}
