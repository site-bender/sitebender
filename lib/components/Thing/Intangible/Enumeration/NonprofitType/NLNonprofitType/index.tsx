import type BaseProps from "../../../../../../types/index.ts"
import type { NLNonprofitType as NLNonprofitTypeProps } from "../../../../../../types/index.ts"

import NonprofitType from "../index.tsx"

export type Props = NLNonprofitTypeProps & BaseProps

export default function NLNonprofitType({
	_type = "NLNonprofitType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
