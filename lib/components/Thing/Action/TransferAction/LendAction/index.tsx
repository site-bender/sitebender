import type BaseProps from "../../../../../types/index.ts"
import type { LendAction as LendActionProps } from "../../../../../types/index.ts"

import TransferAction from "../index.tsx"

export type Props = LendActionProps & BaseProps

export default function LendAction({
	_type = "LendAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
