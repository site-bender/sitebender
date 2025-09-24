import type BaseProps from "../../../../../../types/index.ts"
import type { MoneyTransfer as MoneyTransferProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MoneyTransferProps & BaseProps

export default function MoneyTransfer({
	_type = "MoneyTransfer",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
