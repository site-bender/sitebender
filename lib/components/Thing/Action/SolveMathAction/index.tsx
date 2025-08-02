import type BaseProps from "../../../../types/index.ts"
import type SolveMathActionProps from "../../../../types/Thing/Action/SolveMathAction/index.ts"

import Action from "../index.tsx"

export type Props = SolveMathActionProps & BaseProps

export default function SolveMathAction({
	eduQuestionType,
	_type = "SolveMathAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				eduQuestionType,
				...subtypeProperties,
			}}
		>
			{children}
		</Action>
	)
}
