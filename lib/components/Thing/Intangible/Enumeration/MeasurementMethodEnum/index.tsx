import type BaseProps from "../../../../../types/index.ts"
import type { MeasurementMethodEnum as MeasurementMethodEnumProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = MeasurementMethodEnumProps & BaseProps

export default function MeasurementMethodEnum({
	_type = "MeasurementMethodEnum",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
