import type BaseProps from "../../../../../types/index.ts"
import type { NonprofitType as NonprofitTypeProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = NonprofitTypeProps & BaseProps

export default function NonprofitType({
	_type = "NonprofitType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
