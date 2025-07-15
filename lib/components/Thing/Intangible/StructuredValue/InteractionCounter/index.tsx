import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type InteractionCounterProps from "../../../../../types/Thing/InteractionCounter/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	InteractionCounterProps,
	"InteractionCounter",
	ExtractLevelProps<InteractionCounterProps, StructuredValueProps>
>

export default function InteractionCounter(
	{
		endTime,
		interactionService,
		interactionType,
		location,
		startTime,
		userInteractionCount,
		schemaType = "InteractionCounter",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
