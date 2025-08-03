import type BaseProps from "../../../../../types/index.ts"
import type { ReplaceAction as ReplaceActionProps } from "../../../../../types/index.ts"

import UpdateAction from "../index.tsx"

export type Props = ReplaceActionProps & BaseProps

export default function ReplaceAction({
	_type = "ReplaceAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
