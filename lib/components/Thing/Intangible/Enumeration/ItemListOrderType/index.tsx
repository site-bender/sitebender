import type BaseProps from "../../../../../types/index.ts"
import type { ItemListOrderType as ItemListOrderTypeProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = ItemListOrderTypeProps & BaseProps

export default function ItemListOrderType({
	_type = "ItemListOrderType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
