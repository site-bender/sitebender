import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { AccountingServiceType } from "./AccountingService/index.ts"
import type { AutomatedTellerType } from "./AutomatedTeller/index.ts"
import type { BankOrCreditUnionType } from "./BankOrCreditUnion/index.ts"
import type { InsuranceAgencyType } from "./InsuranceAgency/index.ts"

export type FinancialServiceType =
	| "FinancialService"
	| InsuranceAgencyType
	| AccountingServiceType
	| AutomatedTellerType
	| BankOrCreditUnionType

export interface FinancialServiceProps {
	"@type"?: FinancialServiceType
	feesAndCommissionsSpecification?: Text | URL
}

type FinancialService =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& FinancialServiceProps

export default FinancialService
