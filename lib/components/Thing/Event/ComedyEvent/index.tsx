import type BaseProps from "../../../../types/index.ts"
import type { ComedyEventProps } from "../../../../types/Thing/Event/ComedyEvent/index.ts"

import Event from "../index.tsx"

export type Props = ComedyEventProps & BaseProps

export default function ComedyEvent({
	_type = "ComedyEvent",
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
