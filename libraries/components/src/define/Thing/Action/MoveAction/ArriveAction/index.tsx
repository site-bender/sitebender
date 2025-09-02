import type BaseProps from "../../../../../../types/index.ts"
import type { ArriveAction as ArriveActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ArriveActionProps & BaseProps

export default function ArriveAction({
	_type = "ArriveAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
