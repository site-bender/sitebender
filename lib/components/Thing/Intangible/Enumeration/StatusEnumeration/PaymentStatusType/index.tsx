import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type PaymentStatusTypeProps from "../../../../../../types/Thing/PaymentStatusType/index.ts"
import type StatusEnumerationProps from "../../../../../../types/Thing/StatusEnumeration/index.ts"

import StatusEnumeration from "../index.tsx"

// PaymentStatusType adds no properties to the StatusEnumeration schema type
export type Props = BaseComponentProps<
	PaymentStatusTypeProps,
	"PaymentStatusType",
	ExtractLevelProps<PaymentStatusTypeProps, StatusEnumerationProps>
>

export default function PaymentStatusType({
	schemaType = "PaymentStatusType",
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
