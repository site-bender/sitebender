import type BaseProps from "../../../../../types/index.ts"
import type { Diet as DietProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DietProps & BaseProps

export default function Diet({
	_type = "Diet",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
