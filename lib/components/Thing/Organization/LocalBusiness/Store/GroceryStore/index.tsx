import type BaseProps from "../../../../../../types/index.ts"
import type { GroceryStore as GroceryStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = GroceryStoreProps & BaseProps

export default function GroceryStore({
	_type = "GroceryStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
