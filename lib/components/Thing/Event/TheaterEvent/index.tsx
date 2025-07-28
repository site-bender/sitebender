import type BaseProps from "../../../../types/index.ts"
import type { TheaterEventProps } from "../../../../types/Thing/Event/TheaterEvent/index.ts"

import Event from "../index.tsx"

export type Props = TheaterEventProps & BaseProps

export default function TheaterEvent({
	_type = "TheaterEvent",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Event
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
