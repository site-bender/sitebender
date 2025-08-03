import type BaseProps from "../../../../../../types/index.ts"
import type { AssignAction as AssignActionProps } from "../../../../../../types/index.ts"

import AllocateAction from "../index.tsx"

export type Props = AssignActionProps & BaseProps

export default function AssignAction({
	_type = "AssignAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
