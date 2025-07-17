import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type PaymentMethodTypeProps from "../../../../../types/Thing/PaymentMethodType/index.ts"

import Enumeration from "../index.tsx"

// PaymentMethodType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	PaymentMethodTypeProps,
	"PaymentMethodType",
	ExtractLevelProps<PaymentMethodTypeProps, EnumerationProps>
>

export default function PaymentMethodType({
	schemaType = "PaymentMethodType",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
