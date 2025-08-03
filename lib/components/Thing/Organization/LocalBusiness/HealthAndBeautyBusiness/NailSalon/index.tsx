import type BaseProps from "../../../../../../types/index.ts"
import type { NailSalon as NailSalonProps } from "../../../../../../types/index.ts"

import HealthAndBeautyBusiness from "../index.tsx"

export type Props = NailSalonProps & BaseProps

export default function NailSalon({
	_type = "NailSalon",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
