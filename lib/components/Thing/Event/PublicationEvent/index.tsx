import type BaseProps from "../../../../types/index.ts"
import type { PublicationEventProps } from "../../../../types/Thing/Event/PublicationEvent/index.ts"

import Event from "../index.tsx"

export type Props = PublicationEventProps & BaseProps

export default function PublicationEvent({
	free,
	publishedBy,
	publishedOn,
	_type = "PublicationEvent",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Event
			{...props}
			_type={_type}
			subtypeProperties={{
				free,
				publishedBy,
				publishedOn,
				...subtypeProperties,
			}}
		/>
	)
}
