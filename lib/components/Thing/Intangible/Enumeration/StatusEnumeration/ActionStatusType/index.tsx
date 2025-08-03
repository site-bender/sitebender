import type BaseProps from "../../../../../../types/index.ts"
import type { ActionStatusType as ActionStatusTypeProps } from "../../../../../../types/index.ts"

import StatusEnumeration from "../index.tsx"

export type Props = ActionStatusTypeProps & BaseProps

export default function ActionStatusType({
	_type = "ActionStatusType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
