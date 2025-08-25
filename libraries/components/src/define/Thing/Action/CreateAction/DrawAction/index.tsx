import type BaseProps from "../../../../../../types/index.ts"
import type { DrawAction as DrawActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DrawActionProps & BaseProps

export default function DrawAction({
	_type = "DrawAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
