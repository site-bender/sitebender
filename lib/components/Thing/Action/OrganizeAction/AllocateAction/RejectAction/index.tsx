import type BaseProps from "../../../../../../types/index.ts"
import type { RejectAction as RejectActionProps } from "../../../../../../types/index.ts"

import AllocateAction from "../index.tsx"

export type Props = RejectActionProps & BaseProps

export default function RejectAction({
	_type = "RejectAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
