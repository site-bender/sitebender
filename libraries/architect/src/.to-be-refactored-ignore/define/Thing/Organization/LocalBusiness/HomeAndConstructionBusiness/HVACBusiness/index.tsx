import type BaseProps from "../../../../../../../types/index.ts"
import type { HVACBusiness as HVACBusinessProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = HVACBusinessProps & BaseProps

export default function HVACBusiness({
	_type = "HVACBusiness",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
