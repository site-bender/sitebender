import type BaseProps from "../../../../../../types/index.ts"
import type { AgreeAction as AgreeActionProps } from "../../../../../../types/index.ts"

import ReactAction from "../index.tsx"

export type Props = AgreeActionProps & BaseProps

export default function AgreeAction({
	_type = "AgreeAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
