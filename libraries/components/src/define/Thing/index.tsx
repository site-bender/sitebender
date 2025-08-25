import type BaseProps from "../../../types/index.ts"
import type { ComponentType } from "../../../types/JSX/index.ts"
import type Props from "../../../types/Thing/index.ts"

import Base from "../Base/index.tsx"

export default function Thing({
	_type = "Thing",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
