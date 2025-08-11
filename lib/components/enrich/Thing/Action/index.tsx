import type BaseProps from "../../../types/index.ts"
import type { Action as ActionProps } from "../../../types/index.ts"

import Base from "../../Base/index.tsx"

export type Props = ActionProps & BaseProps

export default function Action({
	_type = "Action",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
