import type BaseProps from "../../../../../types/index.ts"
import type PlayGameActionProps from "../../../../../types/Thing/Action/ConsumeAction/PlayGameAction/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = PlayGameActionProps & BaseProps

export default function PlayGameAction({
	gameAvailabilityType,
	_type = "PlayGameAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ConsumeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				gameAvailabilityType,
				...subtypeProperties,
			}}
		>{children}</ConsumeAction>
	)
}
