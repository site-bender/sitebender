import { Number, Text } from "../../../../DataType/index.ts"
import MonetaryAmount from "../../../Intangible/StructuredValue/MonetaryAmount/index.ts"
import BankOrCreditUnion from "../../../Organization/LocalBusiness/FinancialService/BankOrCreditUnion/index.ts"
import TransferAction from "../index.ts"

export default interface MoneyTransfer extends TransferAction {
	/** The amount of money. */
	amount?: Number | MonetaryAmount
	/** A bank or bank’s branch, financial institution or international financial institution operating the beneficiary’s bank account or releasing funds for the beneficiary. */
	beneficiaryBank?: Text | BankOrCreditUnion
}
