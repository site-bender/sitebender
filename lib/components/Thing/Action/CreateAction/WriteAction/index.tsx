import type BaseProps from "../../../../../types/index.ts"
import type { WriteAction as WriteActionProps } from "../../../../../types/index.ts"

import CreateAction from "../index.tsx"

export type Props = WriteActionProps & BaseProps

export default function WriteAction({
	_type = "WriteAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
