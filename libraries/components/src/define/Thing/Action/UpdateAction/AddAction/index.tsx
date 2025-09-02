import type BaseProps from "../../../../../../types/index.ts"
import type { AddAction as AddActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = AddActionProps & BaseProps

export default function AddAction({
	_type = "AddAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
