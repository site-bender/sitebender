import type BaseProps from "../../../../types/index.ts"
import type ChildrensEventProps from "../../../../types/Thing/Event/ChildrensEvent/index.ts"

import Event from "../index.tsx"

export type Props = ChildrensEventProps & BaseProps

export default function ChildrensEvent({
	_type = "ChildrensEvent",
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
