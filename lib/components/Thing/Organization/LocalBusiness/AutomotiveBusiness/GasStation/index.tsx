import type BaseProps from "../../../../../../types/index.ts"
import type GasStationProps from "../../../../../../types/Thing/Organization/LocalBusiness/AutomotiveBusiness/GasStation/index.ts"

import AutomotiveBusiness from "../index.tsx"

export type Props = GasStationProps & BaseProps

export default function GasStation({
	_type = "GasStation",
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
