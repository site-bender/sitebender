import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type EmergencyServiceProps from "../../../../../../types/Thing/EmergencyService/index.ts"
import type FireStationProps from "../../../../../../types/Thing/FireStation/index.ts"

import EmergencyService from "../index.tsx"

// FireStation adds no properties to the EmergencyService schema type
export type Props = BaseComponentProps<
	FireStationProps,
	"FireStation",
	ExtractLevelProps<FireStationProps, EmergencyServiceProps>
>

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
		>{children}</FireStationProps>
	)
}
