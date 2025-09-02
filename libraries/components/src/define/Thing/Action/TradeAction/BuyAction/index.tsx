import type BaseProps from "../../../../../../types/index.ts"
import type { BuyAction as BuyActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BuyActionProps & BaseProps

export default function BuyAction({
	_type = "BuyAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
