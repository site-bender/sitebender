import type BaseProps from "../../../../../../types/index.ts"
import type { DislikeAction as DislikeActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = DislikeActionProps & BaseProps

export default function DislikeAction({
	_type = "DislikeAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
