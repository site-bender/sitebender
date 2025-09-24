import type BaseProps from "../../../../../types/index.ts"
import type { EducationalOccupationalProgram as EducationalOccupationalProgramProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = EducationalOccupationalProgramProps & BaseProps

export default function EducationalOccupationalProgram({
	_type = "EducationalOccupationalProgram",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
