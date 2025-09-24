import type BaseProps from "../../../../../../types/index.ts"
import type { HealthAndBeautyBusiness as HealthAndBeautyBusinessProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = HealthAndBeautyBusinessProps & BaseProps

export default function HealthAndBeautyBusiness({
	_type = "HealthAndBeautyBusiness",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
