import type BaseProps from "../../../../../../../types/index.ts"
import type { PhysicalTherapy as PhysicalTherapyProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = PhysicalTherapyProps & BaseProps

export default function PhysicalTherapy({
	_type = "PhysicalTherapy",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
