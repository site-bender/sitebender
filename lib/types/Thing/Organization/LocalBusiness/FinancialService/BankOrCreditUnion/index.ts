// BankOrCreditUnion extends FinancialService but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { FinancialServiceProps } from "../../../../Place/LocalBusiness/FinancialService/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface BankOrCreditUnionProps {}

type BankOrCreditUnion =
	& Thing
	& FinancialServiceProps
	& LocalBusinessProps
	& PlaceProps
	& BankOrCreditUnionProps

export default BankOrCreditUnion
