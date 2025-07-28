import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FinancialServiceProps } from "../index.ts"

export interface AutomatedTellerProps {}

type AutomatedTeller =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FinancialServiceProps
	& OrganizationProps
	& AutomatedTellerProps

export default AutomatedTeller
