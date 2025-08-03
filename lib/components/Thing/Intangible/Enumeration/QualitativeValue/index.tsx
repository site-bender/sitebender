import type BaseProps from "../../../../../types/index.ts"
import type { QualitativeValue as QualitativeValueProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = QualitativeValueProps & BaseProps

export default function QualitativeValue({
	_type = "QualitativeValue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
