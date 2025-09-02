import type BaseProps from "../../../../../../types/index.ts"
import type { CommunicateAction as CommunicateActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CommunicateActionProps & BaseProps

export default function CommunicateAction({
	_type = "CommunicateAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
