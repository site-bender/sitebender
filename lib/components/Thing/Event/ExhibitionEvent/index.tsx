import type BaseProps from "../../../../types/index.ts"
import type ExhibitionEventProps from "../../../../types/Thing/Event/ExhibitionEvent/index.ts"

import Event from "../index.tsx"

export type Props = ExhibitionEventProps & BaseProps

export default function ExhibitionEvent({
	_type = "ExhibitionEvent",
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
