import type BaseProps from "../../../../types/index.ts"
import type InteractActionProps from "../../../../types/Thing/Action/InteractAction/index.ts"

import Action from "../index.tsx"

export type Props = InteractActionProps & BaseProps

export default function InteractAction({
	_type = "InteractAction",
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
