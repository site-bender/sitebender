import type BaseProps from "../../../../../../types/index.ts"
import type AgreeActionProps from "../../../../../../types/Thing/Action/AssessAction/ReactAction/AgreeAction/index.ts"

import ReactAction from "../index.tsx"

export type Props = AgreeActionProps & BaseProps

export default function AgreeAction({
	_type = "AgreeAction",
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
