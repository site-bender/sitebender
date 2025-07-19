import type Thing from "../../../../../index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type Duration from "../../../Quantity/Duration/index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type QuantitativeValue from "../../../StructuredValue/QuantitativeValue/index.ts"
import type RepaymentSpecification from "../../../StructuredValue/RepaymentSpecification/index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"

export interface LoanOrCreditProps {
	/** The amount of money. */
	amount?: Number | MonetaryAmount
	/** The currency in which the monetary amount is expressed.\n\nUse standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217), e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies, e.g. "BTC"; well known names for [Local Exchange Trading Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types, e.g. "Ithaca HOUR". */
	currency?: Text
	/** The period of time after any due date that the borrower has to fulfil its obligations before a default (failure to pay) is deemed to have occurred. */
	gracePeriod?: Duration
	/** A form of paying back money previously borrowed from a lender. Repayment usually takes the form of periodic payments that normally include part principal plus interest in each payment. */
	loanRepaymentForm?: RepaymentSpecification
	/** The duration of the loan or credit agreement. */
	loanTerm?: QuantitativeValue
	/** The type of a loan or credit. */
	loanType?: URL | Text
	/** The only way you get the money back in the event of default is the security. Recourse is where you still have the opportunity to go back to the borrower for the rest of the money. */
	recourseLoan?: Boolean
	/** Whether the terms for payment of interest can be renegotiated during the life of the loan. */
	renegotiableLoan?: Boolean
	/** Assets required to secure loan or credit repayments. It may take form of third party pledge, goods, financial instruments (cash, securities, etc.) */
	requiredCollateral?: Thing | Text
}

type LoanOrCredit =
	& Thing
	& FinancialProductProps
	& IntangibleProps
	& ServiceProps
	& LoanOrCreditProps

export default LoanOrCredit
