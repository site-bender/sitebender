import type BaseProps from "../../../../../types/index.ts"
import type EmergencyServiceProps from "../../../../../types/Thing/Organization/LocalBusiness/EmergencyService/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = EmergencyServiceProps & BaseProps

export default function EmergencyService({
	_type = "EmergencyService",
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
		/>
	)
}
