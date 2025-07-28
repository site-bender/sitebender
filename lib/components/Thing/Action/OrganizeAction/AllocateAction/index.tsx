import type BaseProps from "../../../../../types/index.ts"
import type { AllocateActionProps } from "../../../../../types/Thing/Action/OrganizeAction/AllocateAction/index.ts"

import OrganizeAction from "../index.tsx"

export type Props = AllocateActionProps & BaseProps

export default function AllocateAction({
	_type = "AllocateAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<OrganizeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
