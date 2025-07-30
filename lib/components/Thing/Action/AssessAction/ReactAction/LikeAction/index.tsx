import type BaseProps from "../../../../../../types/index.ts"
import type LikeActionProps from "../../../../../../types/Thing/Action/AssessAction/ReactAction/LikeAction/index.ts"

import ReactAction from "../index.tsx"

export type Props = LikeActionProps & BaseProps

export default function LikeAction({
	_type = "LikeAction",
	children,
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
		>{children}</ReactAction>
	)
}
