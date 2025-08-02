import type BaseProps from "../../../../types/index.ts"
import type LiteraryEventProps from "../../../../types/Thing/Event/LiteraryEvent/index.ts"

import Event from "../index.tsx"

export type Props = LiteraryEventProps & BaseProps

export default function LiteraryEvent({
	_type = "LiteraryEvent",
	children,
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
		>
			{children}
		</Event>
	)
}
