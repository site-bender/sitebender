import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ReservationStatusTypeProps from "../../../../../../types/Thing/ReservationStatusType/index.ts"
import type StatusEnumerationProps from "../../../../../../types/Thing/StatusEnumeration/index.ts"

import StatusEnumeration from "../index.tsx"

// ReservationStatusType adds no properties to the StatusEnumeration schema type
export type Props = BaseComponentProps<
	ReservationStatusTypeProps,
	"ReservationStatusType",
	ExtractLevelProps<ReservationStatusTypeProps, StatusEnumerationProps>
>

export default function ReservationStatusType({
	schemaType = "ReservationStatusType",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<StatusEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
