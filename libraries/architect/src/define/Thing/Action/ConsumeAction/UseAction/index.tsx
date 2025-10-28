import type BaseProps from "../../../../../../types/index.ts"
import type { UseAction as UseActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = UseActionProps & BaseProps

export default function UseAction({
	_type = "UseAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
