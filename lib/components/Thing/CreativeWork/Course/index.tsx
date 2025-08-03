import type BaseProps from "../../../../types/index.ts"
import type { Course as CourseProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = CourseProps & BaseProps

export default function Course({
	_type = "Course",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
