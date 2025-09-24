import type BaseProps from "../../../../../../types/index.ts"
import type { ChooseAction as ChooseActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ChooseActionProps & BaseProps

export default function ChooseAction({
	_type = "ChooseAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
