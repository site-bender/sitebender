import type BaseProps from "../../../../../../types/index.ts"
import type { USNonprofitType as USNonprofitTypeProps } from "../../../../../../types/index.ts"

import NonprofitType from "../index.tsx"

export type Props = USNonprofitTypeProps & BaseProps

export default function USNonprofitType({
	_type = "USNonprofitType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
