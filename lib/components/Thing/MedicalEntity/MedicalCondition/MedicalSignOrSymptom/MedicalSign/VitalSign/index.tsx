import type BaseProps from "../../../../../../../types/index.ts"
import type { VitalSign as VitalSignProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = VitalSignProps & BaseProps

export default function VitalSign({
	_type = "VitalSign",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
