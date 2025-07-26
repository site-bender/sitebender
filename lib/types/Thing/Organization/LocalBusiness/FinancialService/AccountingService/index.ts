import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FinancialServiceProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

export interface AccountingServiceProps {
}

type AccountingService =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FinancialServiceProps
	& OrganizationProps
	& AccountingServiceProps

export default AccountingService
