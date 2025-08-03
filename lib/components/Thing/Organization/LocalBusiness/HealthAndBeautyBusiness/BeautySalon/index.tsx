import type BaseProps from "../../../../../../types/index.ts"
import type { BeautySalon as BeautySalonProps } from "../../../../../../types/index.ts"

import HealthAndBeautyBusiness from "../index.tsx"

export type Props = BeautySalonProps & BaseProps

export default function BeautySalon({
	_type = "BeautySalon",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
