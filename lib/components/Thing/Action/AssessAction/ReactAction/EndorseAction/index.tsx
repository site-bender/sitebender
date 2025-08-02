import type BaseProps from "../../../../../../types/index.ts"
import type EndorseActionProps from "../../../../../../types/Thing/Action/AssessAction/ReactAction/EndorseAction/index.ts"

import ReactAction from "../index.tsx"

export type Props = EndorseActionProps & BaseProps

export default function EndorseAction({
	endorsee,
	_type = "EndorseAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ReactAction
			{...props}
			_type={_type}
			subtypeProperties={{
				endorsee,
				...subtypeProperties,
			}}
		>
			{children}
		</ReactAction>
	)
}
