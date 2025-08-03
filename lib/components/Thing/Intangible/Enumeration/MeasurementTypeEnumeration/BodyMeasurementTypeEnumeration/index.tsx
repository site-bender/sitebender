import type BaseProps from "../../../../../../types/index.ts"
import type { BodyMeasurementTypeEnumeration as BodyMeasurementTypeEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = BodyMeasurementTypeEnumerationProps & BaseProps

export default function BodyMeasurementTypeEnumeration({
	_type = "BodyMeasurementTypeEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
