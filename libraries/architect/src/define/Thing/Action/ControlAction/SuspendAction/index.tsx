import type BaseProps from "../../../../../../types/index.ts"
import type { SuspendAction as SuspendActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = SuspendActionProps & BaseProps

export default function SuspendAction({
	_type = "SuspendAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
