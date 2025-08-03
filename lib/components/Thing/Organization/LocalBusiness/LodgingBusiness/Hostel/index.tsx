import type BaseProps from "../../../../../../types/index.ts"
import type { Hostel as HostelProps } from "../../../../../../types/index.ts"

import LodgingBusiness from "../index.tsx"

export type Props = HostelProps & BaseProps

export default function Hostel({
	_type = "Hostel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
