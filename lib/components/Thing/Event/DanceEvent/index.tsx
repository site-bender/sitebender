import type BaseProps from "../../../../types/index.ts"
import type { DanceEventProps } from "../../../../types/Thing/Event/DanceEvent/index.ts"

import Event from "../index.tsx"

export type Props = DanceEventProps & BaseProps

export default function DanceEvent({
	_type = "DanceEvent",
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
