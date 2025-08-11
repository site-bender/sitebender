import type BaseProps from "../../../../../types/index.ts"
import type { CollegeOrUniversity as CollegeOrUniversityProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CollegeOrUniversityProps & BaseProps

export default function CollegeOrUniversity({
	_type = "CollegeOrUniversity",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
