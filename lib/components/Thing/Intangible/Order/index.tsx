import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type OrderProps from "../../../../types/Thing/Order/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	OrderProps,
	"Order",
	ExtractLevelProps<OrderProps, IntangibleProps>
>

export default function Order(
	{
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
		orderNumber,
		orderStatus,
		orderedItem,
		partOfInvoice,
		paymentDue,
		paymentDueDate,
		paymentMethod,
		paymentMethodId,
		paymentUrl,
		seller,
		schemaType = "Order",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
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
				orderNumber,
				orderStatus,
				orderedItem,
				partOfInvoice,
				paymentDue,
				paymentDueDate,
				paymentMethod,
				paymentMethodId,
				paymentUrl,
				seller,
				...subtypeProperties,
			}}
		/>
	)
}
