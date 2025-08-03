import type BaseProps from "../../../../../types/index.ts"
import type { DrinkAction as DrinkActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DrinkActionProps & BaseProps

export default function DrinkAction({
	_type = "DrinkAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
