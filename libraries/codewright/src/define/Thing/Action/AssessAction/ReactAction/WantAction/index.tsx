import type BaseProps from "../../../../../../../types/index.ts"
import type { WantAction as WantActionProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = WantActionProps & BaseProps

export default function WantAction({
	_type = "WantAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
