import type BaseProps from "../../../../../types/index.ts"
import type { CourseInstance as CourseInstanceProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = CourseInstanceProps & BaseProps

export default function CourseInstance({
	_type = "CourseInstance",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
