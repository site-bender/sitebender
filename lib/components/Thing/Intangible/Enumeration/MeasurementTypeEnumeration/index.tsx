import type BaseProps from "../../../../../types/index.ts"
import type { MeasurementTypeEnumeration as MeasurementTypeEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = MeasurementTypeEnumerationProps & BaseProps

export default function MeasurementTypeEnumeration({
	_type = "MeasurementTypeEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
