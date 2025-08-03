import type BaseProps from "../../../../../types/index.ts"
import type { HowToItem as HowToItemProps } from "../../../../../types/index.ts"

import ListItem from "../index.tsx"

export type Props = HowToItemProps & BaseProps

export default function HowToItem({
	_type = "HowToItem",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
