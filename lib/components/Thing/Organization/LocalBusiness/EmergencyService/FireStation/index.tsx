import type BaseProps from "../../../../../../types/index.ts"
import type FireStationProps from "../../../../../../types/Thing/Organization/LocalBusiness/EmergencyService/FireStation/index.ts"

import EmergencyService from "../index.tsx"

// FireStation adds no properties to the ListItem schema type
export type Props = FireStationProps & BaseProps

export default function FireStation({
	_type = "FireStation",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<EmergencyService
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</EmergencyService>
	)
}
