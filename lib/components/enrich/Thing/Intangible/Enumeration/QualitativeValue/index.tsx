import type BaseProps from "../../../../../types/index.ts"
import type { QualitativeValue as QualitativeValueProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = QualitativeValueProps & BaseProps

export default function QualitativeValue({
	_type = "QualitativeValue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
