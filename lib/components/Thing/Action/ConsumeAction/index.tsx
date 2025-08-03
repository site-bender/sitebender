import type BaseProps from "../../../../types/index.ts"
import type { ConsumeAction as ConsumeActionProps } from "../../../../types/index.ts"

import Action from "../index.tsx"

export type Props = ConsumeActionProps & BaseProps

export default function ConsumeAction({
	_type = "ConsumeAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
