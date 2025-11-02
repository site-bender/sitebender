import type BaseProps from "../../../../../../../types/index.ts"
import type { BedAndBreakfast as BedAndBreakfastProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = BedAndBreakfastProps & BaseProps

export default function BedAndBreakfast({
	_type = "BedAndBreakfast",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
