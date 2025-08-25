import type BaseProps from "../../../../../types/index.ts"
import type { MenuSection as MenuSectionProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MenuSectionProps & BaseProps

export default function MenuSection({
	_type = "MenuSection",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
