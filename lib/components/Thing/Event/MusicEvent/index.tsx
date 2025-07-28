import type BaseProps from "../../../../types/index.ts"
import type { MusicEventProps } from "../../../../types/Thing/Event/MusicEvent/index.ts"

import Event from "../index.tsx"

export type Props = MusicEventProps & BaseProps

export default function MusicEvent({
	_type = "MusicEvent",
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
