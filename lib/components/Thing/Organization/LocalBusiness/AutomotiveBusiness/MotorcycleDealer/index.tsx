import type BaseProps from "../../../../../../types/index.ts"
import type MotorcycleDealerProps from "../../../../../../types/Thing/Organization/LocalBusiness/AutomotiveBusiness/MotorcycleDealer/index.ts"

import AutomotiveBusiness from "../index.tsx"

export type Props = MotorcycleDealerProps & BaseProps

export default function MotorcycleDealer({
	_type = "MotorcycleDealer",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AutomotiveBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</AutomotiveBusiness>
	)
}
