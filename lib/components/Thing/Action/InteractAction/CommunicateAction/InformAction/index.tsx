import type BaseProps from "../../../../../../types/index.ts"
import type { InformAction as InformActionProps } from "../../../../../../types/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = InformActionProps & BaseProps

export default function InformAction({
	_type = "InformAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
