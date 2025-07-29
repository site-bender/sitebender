import type BaseProps from "../../../../types/index.ts"
import type UserInteractionProps from "../../../../types/Thing/Event/UserInteraction/index.ts"

import Event from "../index.tsx"

export type Props = UserInteractionProps & BaseProps

export default function UserInteraction({
	_type = "UserInteraction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Event
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
