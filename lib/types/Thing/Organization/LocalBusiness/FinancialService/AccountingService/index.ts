// AccountingService extends FinancialService but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { FinancialServiceProps } from "../../../../Place/LocalBusiness/FinancialService/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface AccountingServiceProps {}

type AccountingService =
	& Thing
	& FinancialServiceProps
	& LocalBusinessProps
	& PlaceProps
	& AccountingServiceProps

export default AccountingService
