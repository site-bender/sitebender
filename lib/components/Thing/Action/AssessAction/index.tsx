import type BaseProps from "../../../../types/index.ts"
import type AssessActionProps from "../../../../types/Thing/Action/AssessAction/index.ts"

import Action from "../index.tsx"

export type Props = AssessActionProps & BaseProps

export default function AssessAction({
	_type = "AssessAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
