import type BaseProps from "../../../../../../types/index.ts"
import type { BankAccount as BankAccountProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = BankAccountProps & BaseProps

export default function BankAccount({
	_type = "BankAccount",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
