import type BaseProps from "../../../../../../types/index.ts"
import type WantActionProps from "../../../../../../types/Thing/Action/AssessAction/ReactAction/WantAction/index.ts"

import ReactAction from "../index.tsx"

export type Props = WantActionProps & BaseProps

export default function WantAction({
	_type = "WantAction",
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
		>
			{children}
		</ReactAction>
	)
}
