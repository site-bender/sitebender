import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { EventProps } from "../../../../types/Thing/Event/index.ts"
import type { PublicationEventProps } from "../../../../types/Thing/Event/PublicationEvent/index.ts"

import Event from "../index.tsx"

export type Props = BaseComponentProps<
	PublicationEventProps,
	"PublicationEvent",
	ExtractLevelProps<ThingProps, EventProps>
>

export default function PublicationEvent({
	free,
	publishedBy,
	publishedOn,
	schemaType = "PublicationEvent",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Event
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				free,
				publishedBy,
				publishedOn,
				...subtypeProperties,
			}}
		/>
	)
}
