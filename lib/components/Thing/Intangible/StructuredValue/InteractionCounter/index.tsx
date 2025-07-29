import type BaseProps from "../../../../../types/index.ts"
import type InteractionCounterProps from "../../../../../types/Thing/Intangible/StructuredValue/InteractionCounter/index.ts"

import StructuredValue from "../index.tsx"

export type Props = InteractionCounterProps & BaseProps

export default function InteractionCounter({
	endTime,
	interactionService,
	interactionType,
	location,
	startTime,
	userInteractionCount,
	_type = "InteractionCounter",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
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
