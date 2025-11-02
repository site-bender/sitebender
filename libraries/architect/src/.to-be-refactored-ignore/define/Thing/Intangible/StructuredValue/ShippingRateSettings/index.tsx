import type BaseProps from "../../../../../../types/index.ts"
import type { ShippingRateSettings as ShippingRateSettingsProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ShippingRateSettingsProps & BaseProps

export default function ShippingRateSettings({
	_type = "ShippingRateSettings",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
