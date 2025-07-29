import type BaseProps from "../../../../types/index.ts"
import type PlayActionProps from "../../../../types/Thing/Action/PlayAction/index.ts"

import Action from "../index.tsx"

export type Props = PlayActionProps & BaseProps

export default function PlayAction({
	audience,
	event,
	_type = "PlayAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				audience,
				event,
				...subtypeProperties,
			}}
		/>
	)
}
