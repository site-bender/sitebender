import type BaseProps from "../../../../types/index.ts"
import type { AssessAction as AssessActionProps } from "../../../../types/index.ts"

import Action from "../index.tsx"

export type Props = AssessActionProps & BaseProps

export default function AssessAction({
	_type = "AssessAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
