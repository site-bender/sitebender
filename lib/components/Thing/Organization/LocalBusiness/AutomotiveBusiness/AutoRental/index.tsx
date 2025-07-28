import type BaseProps from "../../../../../../types/index.ts"
import type { AutoRentalProps } from "../../../../../../types/Thing/Organization/LocalBusiness/AutomotiveBusiness/AutoRental/index.ts"

import AutomotiveBusiness from "../index.tsx"

export type Props = AutoRentalProps & BaseProps

export default function AutoRental({
	_type = "AutoRental",
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
		/>
	)
}
