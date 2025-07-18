import type { Boolean, Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type FinancialProduct from "../../Service/FinancialProduct/index.ts"
import type { FinancialProductProps } from "../../Service/FinancialProduct/index.ts"
import type MonetaryAmount from "../../StructuredValue/MonetaryAmount/index.ts"
import type PaymentMethod from "../index.ts"
import type { PaymentMethodProps } from "../index.ts"

export interface PaymentCardProps {
	/** A cardholder benefit that pays the cardholder a small percentage of their net expenditures. */
	cashBack?: Number | Boolean
	/** A secure method for consumers to purchase products or services via debit, credit or smartcards by using RFID or NFC technology. */
	contactlessPayment?: Boolean
	/** A floor limit is the amount of money above which credit card transactions must be authorized. */
	floorLimit?: MonetaryAmount
	/** The minimum payment is the lowest amount of money that one is required to pay on a credit card statement each month. */
	monthlyMinimumRepaymentAmount?: Number | MonetaryAmount
}

type PaymentCard =
	& Thing
	& PaymentMethodProps
	& FinancialProductProps
	& PaymentCardProps

export default PaymentCard
