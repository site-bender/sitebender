import type BaseProps from "../../../../../../types/index.ts"
import type { DisagreeAction as DisagreeActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = DisagreeActionProps & BaseProps

export default function DisagreeAction({
	_type = "DisagreeAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
