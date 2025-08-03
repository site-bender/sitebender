import type BaseProps from "../../../../../types/index.ts"
import type { Hospital as HospitalProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = HospitalProps & BaseProps

export default function Hospital({
	_type = "Hospital",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
