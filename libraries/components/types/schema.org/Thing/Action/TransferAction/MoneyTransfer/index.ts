import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MonetaryAmount from "../../../Intangible/StructuredValue/MonetaryAmount/index.ts"
import type BankOrCreditUnion from "../../../Organization/LocalBusiness/FinancialService/BankOrCreditUnion/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import { BankOrCreditUnion as BankOrCreditUnionComponent } from "../../../../../../components/index.tsx"
import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../../components/index.tsx"

export type MoneyTransferType = "MoneyTransfer"

export interface MoneyTransferProps {
	"@type"?: MoneyTransferType
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
