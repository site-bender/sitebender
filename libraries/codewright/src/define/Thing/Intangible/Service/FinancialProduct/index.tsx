import type BaseProps from "../../../../../../types/index.ts"
import type { FinancialProduct as FinancialProductProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = FinancialProductProps & BaseProps

export default function FinancialProduct({
	_type = "FinancialProduct",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
