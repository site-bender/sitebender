import type BaseProps from "../../../../../../../../types/index.ts"
import type { MortgageLoan as MortgageLoanProps } from "../../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = MortgageLoanProps & BaseProps

export default function MortgageLoan({
	_type = "MortgageLoan",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
