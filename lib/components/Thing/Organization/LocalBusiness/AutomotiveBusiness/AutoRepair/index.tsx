import type BaseProps from "../../../../../../types/index.ts"
import type AutoRepairProps from "../../../../../../types/Thing/Organization/LocalBusiness/AutomotiveBusiness/AutoRepair/index.ts"

import AutomotiveBusiness from "../index.tsx"

export type Props = AutoRepairProps & BaseProps

export default function AutoRepair({
	_type = "AutoRepair",
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
