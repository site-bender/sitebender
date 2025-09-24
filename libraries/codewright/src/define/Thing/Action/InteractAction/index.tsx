import type BaseProps from "../../../../../types/index.ts"
import type { InteractAction as InteractActionProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = InteractActionProps & BaseProps

export default function InteractAction({
	_type = "InteractAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
