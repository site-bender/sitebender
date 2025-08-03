import type BaseProps from "../../../../../types/index.ts"
import type { MarryAction as MarryActionProps } from "../../../../../types/index.ts"

import InteractAction from "../index.tsx"

export type Props = MarryActionProps & BaseProps

export default function MarryAction({
	_type = "MarryAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
