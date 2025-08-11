import type BaseProps from "../../../../types/index.ts"
import type { MenuItem as MenuItemProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MenuItemProps & BaseProps

export default function MenuItem({
	_type = "MenuItem",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
