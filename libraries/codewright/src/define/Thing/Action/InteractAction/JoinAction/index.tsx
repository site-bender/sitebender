import type BaseProps from "../../../../../../types/index.ts"
import type { JoinAction as JoinActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = JoinActionProps & BaseProps

export default function JoinAction({
	_type = "JoinAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
