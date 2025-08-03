import type BaseProps from "../../../../../../types/index.ts"
import type { VoteAction as VoteActionProps } from "../../../../../../types/index.ts"

import ChooseAction from "../index.tsx"

export type Props = VoteActionProps & BaseProps

export default function VoteAction({
	_type = "VoteAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
