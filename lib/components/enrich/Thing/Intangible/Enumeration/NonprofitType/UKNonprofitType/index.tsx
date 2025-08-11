import type BaseProps from "../../../../../../types/index.ts"
import type { UKNonprofitType as UKNonprofitTypeProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = UKNonprofitTypeProps & BaseProps

export default function UKNonprofitType({
	_type = "UKNonprofitType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
