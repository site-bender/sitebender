import type BaseProps from "../../../../../types/index.ts"
import type ResumeActionProps from "../../../../../types/Thing/Action/ControlAction/ResumeAction/index.ts"

import ControlAction from "../index.tsx"

export type Props = ResumeActionProps & BaseProps

export default function ResumeAction({
	_type = "ResumeAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ControlAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
