import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type FestivalProps from "../../../../types/Thing/Festival/index.ts"

import Event from "./index.tsx"

// Festival adds no properties to the Event schema type
export type Props = BaseComponentProps<
	FestivalProps,
	"Festival",
	ExtractLevelProps<FestivalProps, EventProps>
>

export default function Festival({
	schemaType = "Festival",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Event
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
