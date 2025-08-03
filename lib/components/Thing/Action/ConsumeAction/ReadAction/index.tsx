import type BaseProps from "../../../../../types/index.ts"
import type { ReadAction as ReadActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ReadActionProps & BaseProps

export default function ReadAction({
	_type = "ReadAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
