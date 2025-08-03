import type BaseProps from "../../../../../../types/index.ts"
import type { WearableMeasurementTypeEnumeration as WearableMeasurementTypeEnumerationProps } from "../../../../../../types/index.ts"

import MeasurementTypeEnumeration from "../index.tsx"

export type Props = WearableMeasurementTypeEnumerationProps & BaseProps

export default function WearableMeasurementTypeEnumeration({
	_type = "WearableMeasurementTypeEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
