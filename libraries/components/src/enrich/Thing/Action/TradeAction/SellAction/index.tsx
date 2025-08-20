import type BaseProps from "../../../../../types/index.ts"
import type { SellAction as SellActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = SellActionProps & BaseProps

export default function SellAction({
	_type = "SellAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
