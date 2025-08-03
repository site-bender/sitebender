import type BaseProps from "../../../../types/index.ts"
import type { TradeAction as TradeActionProps } from "../../../../types/index.ts"

import Action from "../index.tsx"

export type Props = TradeActionProps & BaseProps

export default function TradeAction({
	_type = "TradeAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
