import type BaseProps from "../../../../types/index.ts"
import type { UpdateAction as UpdateActionProps } from "../../../../types/index.ts"

import Action from "../index.tsx"

export type Props = UpdateActionProps & BaseProps

export default function UpdateAction({
	_type = "UpdateAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
