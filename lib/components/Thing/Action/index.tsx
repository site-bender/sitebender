import type BaseProps from "../../../types/index.ts"
import type { ActionProps } from "../../../types/Thing/Action/index.ts"

import Thing from "../index.tsx"

export type Props = ActionProps & BaseProps

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
	_type = "Action",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Thing
			{...props}
			_type={_type}
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
