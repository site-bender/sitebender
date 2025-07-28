import type { BaseComponentProps, ExtractLevelProps } from "../../../types/index.ts"
import type ThingProps from "../../../types/Thing/index.ts"
import type { ActionProps } from "../../../types/Thing/Action/index.ts"

import Thing from "../index.tsx"

export type Props = BaseComponentProps<
	ActionProps,
	"Action",
	ExtractLevelProps<ThingProps>
>

export default function Action({
	actionProcess,
	actionStatus,
	agent,
	endTime,
	error,
	instrument,
	location,
	object,
	participant,
	provider,
	result,
	startTime,
	target,
	schemaType = "Action",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Thing
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				actionProcess,
				actionStatus,
				agent,
				endTime,
				error,
				instrument,
				location,
				object,
				participant,
				provider,
				result,
				startTime,
				target,
				...subtypeProperties,
			}}
		/>
	)
}
