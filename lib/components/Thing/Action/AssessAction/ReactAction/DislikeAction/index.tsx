import type BaseProps from "../../../../../../types/index.ts"
import type DislikeActionProps from "../../../../../../types/Thing/Action/AssessAction/ReactAction/DislikeAction/index.ts"

import ReactAction from "../index.tsx"

export type Props = DislikeActionProps & BaseProps

export default function DislikeAction({
	_type = "DislikeAction",
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
