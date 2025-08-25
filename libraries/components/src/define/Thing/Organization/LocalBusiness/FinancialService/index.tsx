import type BaseProps from "../../../../../../types/index.ts"
import type { FinancialService as FinancialServiceProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = FinancialServiceProps & BaseProps

export default function FinancialService({
	_type = "FinancialService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
