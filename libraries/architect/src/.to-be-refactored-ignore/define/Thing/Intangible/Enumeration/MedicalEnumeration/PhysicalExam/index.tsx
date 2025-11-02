import type BaseProps from "../../../../../../../types/index.ts"
import type { PhysicalExam as PhysicalExamProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

// PhysicalExam adds no properties to the ListItem schema type
export type Props = PhysicalExamProps & BaseProps

export default function PhysicalExam({
	_type = "PhysicalExam",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
