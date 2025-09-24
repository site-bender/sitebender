import type BaseProps from "../../../../../../../types/index.ts"
import type { Waterfall as WaterfallProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = WaterfallProps & BaseProps

export default function Waterfall({
	_type = "Waterfall",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
