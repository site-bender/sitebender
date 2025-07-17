import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type PaymentMethodProps from "../../../../../types/Thing/PaymentMethod/index.ts"
import type PaymentServiceProps from "../../../../../types/Thing/PaymentService/index.ts"

import PaymentMethod from "../index.tsx"

// PaymentService adds no properties to the PaymentMethod schema type
export type Props = BaseComponentProps<
	PaymentServiceProps,
	"PaymentService",
	ExtractLevelProps<PaymentServiceProps, PaymentMethodProps>
>

export default function PaymentService({
	schemaType = "PaymentService",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<PaymentMethod
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
