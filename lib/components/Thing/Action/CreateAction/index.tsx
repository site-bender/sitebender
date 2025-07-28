import type BaseProps from "../../../../types/index.ts"
import type { CreateActionProps } from "../../../../types/Thing/Action/CreateAction/index.ts"

import Action from "../index.tsx"

export type Props = CreateActionProps & BaseProps

export default function CreateAction({
	_type = "CreateAction",
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
		/>
	)
}
