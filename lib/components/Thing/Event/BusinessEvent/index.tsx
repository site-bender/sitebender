import type BaseProps from "../../../../types/index.ts"
import type { BusinessEventProps } from "../../../../types/Thing/Event/BusinessEvent/index.ts"

import Event from "../index.tsx"

export type Props = BusinessEventProps & BaseProps

export default function BusinessEvent({
	_type = "BusinessEvent",
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
