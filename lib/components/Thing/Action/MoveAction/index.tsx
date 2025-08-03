import type BaseProps from "../../../../types/index.ts"
import type { MoveAction as MoveActionProps } from "../../../../types/index.ts"

import Action from "../index.tsx"

export type Props = MoveActionProps & BaseProps

export default function MoveAction({
	_type = "MoveAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
