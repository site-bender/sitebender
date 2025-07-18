import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type SportsEventProps from "../../../../types/Thing/SportsEvent/index.ts"

import Event from "../index.tsx"

export type Props = BaseComponentProps<
	SportsEventProps,
	"SportsEvent",
	ExtractLevelProps<SportsEventProps, EventProps>
>

export default function SportsEvent(
	{
		awayTeam,
		competitor,
		homeTeam,
		referee,
		sport,
		schemaType = "SportsEvent",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Event
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				awayTeam,
				competitor,
				homeTeam,
				referee,
				sport,
				...subtypeProperties,
			}}
		/>
	)
}
