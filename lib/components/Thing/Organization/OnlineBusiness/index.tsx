import type BaseProps from "../../../../types/index.ts"
import type OnlineBusinessProps from "../../../../types/Thing/Organization/OnlineBusiness/index.ts"

import Organization from "../index.tsx"

export type Props = OnlineBusinessProps & BaseProps

export default function OnlineBusiness({
	_type = "OnlineBusiness",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Organization>
	)
}
