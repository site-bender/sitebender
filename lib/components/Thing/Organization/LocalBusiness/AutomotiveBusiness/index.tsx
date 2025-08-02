import type BaseProps from "../../../../../types/index.ts"
import type AutomotiveBusinessProps from "../../../../../types/Thing/Organization/LocalBusiness/AutomotiveBusiness/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = AutomotiveBusinessProps & BaseProps

export default function AutomotiveBusiness({
	_type = "AutomotiveBusiness",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</LocalBusiness>
	)
}
