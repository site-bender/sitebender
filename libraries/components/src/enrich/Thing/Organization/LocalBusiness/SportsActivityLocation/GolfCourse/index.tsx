import type BaseProps from "../../../../../../types/index.ts"
import type { GolfCourse as GolfCourseProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = GolfCourseProps & BaseProps

export default function GolfCourse({
	_type = "GolfCourse",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
