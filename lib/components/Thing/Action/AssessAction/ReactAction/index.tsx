import type BaseProps from "../../../../../types/index.ts"
import type { ReactAction as ReactActionProps } from "../../../../../types/index.ts"

import AssessAction from "../index.tsx"

export type Props = ReactActionProps & BaseProps

export default function ReactAction({
	_type = "ReactAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
