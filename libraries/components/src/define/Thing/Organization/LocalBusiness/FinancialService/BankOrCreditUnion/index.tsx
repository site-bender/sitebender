import type BaseProps from "../../../../../../types/index.ts"
import type { BankOrCreditUnion as BankOrCreditUnionProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = BankOrCreditUnionProps & BaseProps

export default function BankOrCreditUnion({
	_type = "BankOrCreditUnion",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
