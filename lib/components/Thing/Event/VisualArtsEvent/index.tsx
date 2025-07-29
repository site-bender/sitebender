import type BaseProps from "../../../../types/index.ts"
import type VisualArtsEventProps from "../../../../types/Thing/Event/VisualArtsEvent/index.ts"

import Event from "../index.tsx"

export type Props = VisualArtsEventProps & BaseProps

export default function VisualArtsEvent({
	_type = "VisualArtsEvent",
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
