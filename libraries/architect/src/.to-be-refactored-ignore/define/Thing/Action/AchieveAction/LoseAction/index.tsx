import type BaseProps from "../../../../../../types/index.ts"
import type { LoseAction as LoseActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = LoseActionProps & BaseProps

export default function LoseAction({
	_type = "LoseAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
