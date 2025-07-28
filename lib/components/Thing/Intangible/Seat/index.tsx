import type BaseProps from "../../../../types/index.ts"
import type { SeatProps } from "../../../../types/Thing/Intangible/Seat/index.ts"

import Intangible from "../index.tsx"

export type Props = SeatProps & BaseProps

export default function Seat({
	seatingType,
	seatNumber,
	seatRow,
	seatSection,
	_type = "Seat",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
