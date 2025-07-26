import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"
import type BankOrCreditUnion from "../../../Organization/LocalBusiness/FinancialService/BankOrCreditUnion/index.ts"
import type MonetaryAmount from "../../../Intangible/StructuredValue/MonetaryAmount/index.ts"

export interface MoneyTransferProps {
	amount?: MonetaryAmount | Number
	beneficiaryBank?: BankOrCreditUnion | Text
}

type MoneyTransfer =
	& Thing
	& ActionProps
	& TransferActionProps
	& MoneyTransferProps

export default MoneyTransfer
