import type BaseProps from "../../../../../../../types/index.ts"
import type { AskAction as AskActionProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AskActionProps & BaseProps

export default function AskAction({
	_type = "AskAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
