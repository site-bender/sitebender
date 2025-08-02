import type BaseProps from "../../../../../../types/index.ts"
import type PoliceStationProps from "../../../../../../types/Thing/Organization/LocalBusiness/EmergencyService/PoliceStation/index.ts"

import EmergencyService from "../index.tsx"

// PoliceStation adds no properties to the ListItem schema type
export type Props = PoliceStationProps & BaseProps

export default function PoliceStation({
	_type = "PoliceStation",
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
