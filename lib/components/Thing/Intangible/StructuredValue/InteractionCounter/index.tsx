import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { InteractionCounterProps } from "../../../../../types/Thing/Intangible/StructuredValue/InteractionCounter/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	InteractionCounterProps,
	"InteractionCounter",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function InteractionCounter({
	endTime,
	interactionService,
	interactionType,
	location,
	startTime,
	userInteractionCount,
	schemaType = "InteractionCounter",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				endTime,
				interactionService,
				interactionType,
				location,
				startTime,
				userInteractionCount,
				...subtypeProperties,
			}}
		/>
	)
}
