import type BaseProps from "../../../../../types/index.ts"
import type { ChildrensEvent as ChildrensEventProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ChildrensEventProps & BaseProps

export default function ChildrensEvent({
	_type = "ChildrensEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
