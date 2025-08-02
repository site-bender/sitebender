import type BaseProps from "../../../../../types/index.ts"
import type RealEstateAgentProps from "../../../../../types/Thing/Organization/LocalBusiness/RealEstateAgent/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = RealEstateAgentProps & BaseProps

export default function RealEstateAgent({
	_type = "RealEstateAgent",
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
