import type BaseProps from "../../../../../../types/index.ts"
import type { ShareAction as ShareActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ShareActionProps & BaseProps

export default function ShareAction({
	_type = "ShareAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
