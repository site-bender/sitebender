import type BaseProps from "../../../../types/index.ts"
import type { FinancialIncentive as FinancialIncentiveProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = FinancialIncentiveProps & BaseProps

export default function FinancialIncentive({
	_type = "FinancialIncentive",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
