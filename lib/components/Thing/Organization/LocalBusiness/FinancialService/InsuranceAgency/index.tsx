import type BaseProps from "../../../../../../types/index.ts"
import type { InsuranceAgency as InsuranceAgencyProps } from "../../../../../../types/index.ts"

import FinancialService from "../index.tsx"

export type Props = InsuranceAgencyProps & BaseProps

export default function InsuranceAgency({
	_type = "InsuranceAgency",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
