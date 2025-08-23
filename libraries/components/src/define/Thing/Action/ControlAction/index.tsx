import type BaseProps from "../../../../types/index.ts"
import type { ControlAction as ControlActionProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ControlActionProps & BaseProps

export default function ControlAction({
	_type = "ControlAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
