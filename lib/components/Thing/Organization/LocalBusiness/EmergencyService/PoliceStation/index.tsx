import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type EmergencyServiceProps from "../../../../../../types/Thing/EmergencyService/index.ts"
import type PoliceStationProps from "../../../../../../types/Thing/PoliceStation/index.ts"

import EmergencyService from "../index.tsx"

// PoliceStation adds no properties to the EmergencyService schema type
export type Props = BaseComponentProps<
	PoliceStationProps,
	"PoliceStation",
	ExtractLevelProps<PoliceStationProps, EmergencyServiceProps>
>

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
		>{children}</PoliceStationProps>
	)
}
