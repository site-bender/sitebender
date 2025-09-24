import type BaseProps from "../../../../../types/index.ts"
import type { CreateAction as CreateActionProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = CreateActionProps & BaseProps

export default function CreateAction({
	_type = "CreateAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
