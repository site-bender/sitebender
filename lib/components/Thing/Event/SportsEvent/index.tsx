import type BaseProps from "../../../../types/index.ts"
import type SportsEventProps from "../../../../types/Thing/Event/SportsEvent/index.ts"

import Event from "../index.tsx"

export type Props = SportsEventProps & BaseProps

export default function SportsEvent({
	awayTeam,
	competitor,
	homeTeam,
	referee,
	sport,
	_type = "SportsEvent",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Event
			{...props}
			_type={_type}
			subtypeProperties={{
				awayTeam,
				competitor,
				homeTeam,
				referee,
				sport,
				...subtypeProperties,
			}}
		>{children}</Event>
	)
}
