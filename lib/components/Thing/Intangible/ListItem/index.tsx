import type BaseProps from "../../../../types/index.ts"
import type { ListItem as ListItemProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = ListItemProps & BaseProps

export default function ListItem({
	_type = "ListItem",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
