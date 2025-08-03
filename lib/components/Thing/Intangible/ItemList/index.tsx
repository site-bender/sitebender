import type BaseProps from "../../../../types/index.ts"
import type { ItemList as ItemListProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = ItemListProps & BaseProps

export default function ItemList({
	_type = "ItemList",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
