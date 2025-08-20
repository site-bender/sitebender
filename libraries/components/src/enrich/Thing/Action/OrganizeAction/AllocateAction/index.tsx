import type BaseProps from "../../../../../types/index.ts"
import type { AllocateAction as AllocateActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = AllocateActionProps & BaseProps

export default function AllocateAction({
	_type = "AllocateAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
