import type BaseProps from "../../../../../../types/index.ts"
import type { LikeAction as LikeActionProps } from "../../../../../../types/index.ts"

import ReactAction from "../index.tsx"

export type Props = LikeActionProps & BaseProps

export default function LikeAction({
	_type = "LikeAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
