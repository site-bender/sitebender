import type BaseProps from "../../../../../types/index.ts"
import type GovernmentPermitProps from "../../../../../types/Thing/Intangible/Permit/GovernmentPermit/index.ts"

import Permit from "../index.tsx"

export type Props = GovernmentPermitProps & BaseProps

export default function GovernmentPermit({
	_type = "GovernmentPermit",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Permit
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Permit>
	)
}
