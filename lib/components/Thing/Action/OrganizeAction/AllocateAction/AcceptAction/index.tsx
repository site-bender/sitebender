import type BaseProps from "../../../../../../types/index.ts"
import type { AcceptActionProps } from "../../../../../../types/Thing/Action/OrganizeAction/AllocateAction/AcceptAction/index.ts"

import AllocateAction from "../index.tsx"

export type Props = AcceptActionProps & BaseProps

export default function AcceptAction({
	_type = "AcceptAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AllocateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
