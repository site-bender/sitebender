import type BaseProps from "../../../../../../types/index.ts"
import type DisagreeActionProps from "../../../../../../types/Thing/Action/AssessAction/ReactAction/DisagreeAction/index.ts"

import ReactAction from "../index.tsx"

export type Props = DisagreeActionProps & BaseProps

export default function DisagreeAction({
	_type = "DisagreeAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ReactAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
