import type BaseProps from "../../../../types/index.ts"
import type { FindAction as FindActionProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = FindActionProps & BaseProps

export default function FindAction({
	_type = "FindAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
