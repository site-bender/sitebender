import type BaseProps from "../../../../types/index.ts"
import type { SolveMathAction as SolveMathActionProps } from "../../../../types/index.ts"

import Action from "../index.tsx"

export type Props = SolveMathActionProps & BaseProps

export default function SolveMathAction({
	_type = "SolveMathAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
