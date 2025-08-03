import type BaseProps from "../../../../../types/index.ts"
import type { EatAction as EatActionProps } from "../../../../../types/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = EatActionProps & BaseProps

export default function EatAction({
	_type = "EatAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
