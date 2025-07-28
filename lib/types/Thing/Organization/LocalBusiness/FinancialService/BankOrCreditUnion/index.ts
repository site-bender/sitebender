import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FinancialServiceProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import BankOrCreditUnionComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/FinancialService/BankOrCreditUnion/index.tsx"

export interface BankOrCreditUnionProps {
}

type BankOrCreditUnion =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FinancialServiceProps
	& OrganizationProps
	& BankOrCreditUnionProps

export default BankOrCreditUnion
