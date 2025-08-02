import type BaseProps from "../../../../types/index.ts"
import type FindActionProps from "../../../../types/Thing/Action/FindAction/index.ts"

import Action from "../index.tsx"

export type Props = FindActionProps & BaseProps

export default function FindAction({
	_type = "FindAction",
	children,
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
		>
			{children}
		</Action>
	)
}
