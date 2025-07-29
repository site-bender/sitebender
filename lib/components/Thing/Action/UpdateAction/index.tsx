import type BaseProps from "../../../../types/index.ts"
import type UpdateActionProps from "../../../../types/Thing/Action/UpdateAction/index.ts"

import Action from "../index.tsx"

export type Props = UpdateActionProps & BaseProps

export default function UpdateAction({
	collection,
	targetCollection,
	_type = "UpdateAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				collection,
				targetCollection,
				...subtypeProperties,
			}}
		/>
	)
}
