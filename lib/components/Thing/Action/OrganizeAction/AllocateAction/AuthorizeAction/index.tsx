import type BaseProps from "../../../../../../types/index.ts"
import type AuthorizeActionProps from "../../../../../../types/Thing/Action/OrganizeAction/AllocateAction/AuthorizeAction/index.ts"

import AllocateAction from "../index.tsx"

export type Props = AuthorizeActionProps & BaseProps

export default function AuthorizeAction({
	recipient,
	_type = "AuthorizeAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AllocateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				recipient,
				...subtypeProperties,
			}}
		>
			{children}
		</AllocateAction>
	)
}
