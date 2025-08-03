import type BaseProps from "../../../../types/index.ts"
import type { Menu as MenuProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MenuProps & BaseProps

export default function Menu({
	_type = "Menu",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
