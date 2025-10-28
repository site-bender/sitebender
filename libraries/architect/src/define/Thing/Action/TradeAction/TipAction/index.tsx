import type BaseProps from "../../../../../../types/index.ts"
import type { TipAction as TipActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TipActionProps & BaseProps

export default function TipAction({
	_type = "TipAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
