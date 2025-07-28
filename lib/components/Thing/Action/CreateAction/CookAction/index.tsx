import type BaseProps from "../../../../../types/index.ts"
import type { CookActionProps } from "../../../../../types/Thing/Action/CreateAction/CookAction/index.ts"

import CreateAction from "../index.tsx"

export type Props = CookActionProps & BaseProps

export default function CookAction({
	foodEstablishment,
	foodEvent,
	recipe,
	_type = "CookAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				foodEstablishment,
				foodEvent,
				recipe,
				...subtypeProperties,
			}}
		/>
	)
}
