import type BaseProps from "../../../../types/index.ts"
import type ConsumeActionProps from "../../../../types/Thing/Action/ConsumeAction/index.ts"

import Action from "../index.tsx"

export type Props = ConsumeActionProps & BaseProps

export default function ConsumeAction({
	actionAccessibilityRequirement,
	expectsAcceptanceOf,
	_type = "ConsumeAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				actionAccessibilityRequirement,
				expectsAcceptanceOf,
				...subtypeProperties,
			}}
		>{children}</Action>
	)
}
