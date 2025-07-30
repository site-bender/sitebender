import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MonetaryAmount from "../../../Intangible/StructuredValue/MonetaryAmount/index.ts"
import type BankOrCreditUnion from "../../../Organization/LocalBusiness/FinancialService/BankOrCreditUnion/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import MonetaryAmountComponent from "../../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"
import BankOrCreditUnionComponent from "../../../../../components/Thing/Organization/LocalBusiness/FinancialService/BankOrCreditUnion/index.ts"

export interface MoneyTransferProps {
	"@type"?: "MoneyTransfer"
	amount?: MonetaryAmount | Number | ReturnType<typeof MonetaryAmountComponent>
	beneficiaryBank?:
		| BankOrCreditUnion
		| Text
		| ReturnType<typeof BankOrCreditUnionComponent>
}

type MoneyTransfer =
	& Thing
	& ActionProps
	& TransferActionProps
	& MoneyTransferProps

export default MoneyTransfer
