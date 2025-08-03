import type BaseProps from "../../../../../../types/index.ts"
import type { HairSalon as HairSalonProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = HairSalonProps & BaseProps

export default function HairSalon({
	_type = "HairSalon",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
