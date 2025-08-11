import type BaseProps from "../../../../../../../types/index.ts"
import type { DepositAccount as DepositAccountProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = DepositAccountProps & BaseProps

export default function DepositAccount({
	_type = "DepositAccount",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
