import type BaseProps from "../../../../../types/index.ts"
import type { ShoppingCenter as ShoppingCenterProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ShoppingCenterProps & BaseProps

export default function ShoppingCenter({
	_type = "ShoppingCenter",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
