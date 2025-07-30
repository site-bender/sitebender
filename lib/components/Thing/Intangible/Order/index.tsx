import type BaseProps from "../../../../types/index.ts"
import type OrderProps from "../../../../types/Thing/Intangible/Order/index.ts"

import Intangible from "../index.tsx"

export type Props = OrderProps & BaseProps

export default function Order({
	acceptedOffer,
	billingAddress,
	broker,
	confirmationNumber,
	customer,
	discount,
	discountCode,
	discountCurrency,
	isGift,
	merchant,
	orderDate,
	orderDelivery,
	orderedItem,
	orderNumber,
	orderStatus,
	partOfInvoice,
	paymentDue,
	paymentDueDate,
	paymentMethod,
	paymentMethodId,
	paymentUrl,
	seller,
	_type = "Order",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				acceptedOffer,
				billingAddress,
				broker,
				confirmationNumber,
				customer,
				discount,
				discountCode,
				discountCurrency,
				isGift,
				merchant,
				orderDate,
				orderDelivery,
				orderedItem,
				orderNumber,
				orderStatus,
				partOfInvoice,
				paymentDue,
				paymentDueDate,
				paymentMethod,
				paymentMethodId,
				paymentUrl,
				seller,
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
