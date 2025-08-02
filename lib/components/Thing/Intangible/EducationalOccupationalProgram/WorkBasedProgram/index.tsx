import type BaseProps from "../../../../../types/index.ts"
import type WorkBasedProgramProps from "../../../../../types/Thing/Intangible/EducationalOccupationalProgram/WorkBasedProgram/index.ts"

import EducationalOccupationalProgram from "../index.tsx"

export type Props = WorkBasedProgramProps & BaseProps

export default function WorkBasedProgram({
	occupationalCategory,
	trainingSalary,
	_type = "WorkBasedProgram",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<EducationalOccupationalProgram
			{...props}
			_type={_type}
			subtypeProperties={{
				occupationalCategory,
				trainingSalary,
				...subtypeProperties,
			}}
		>
			{children}
		</EducationalOccupationalProgram>
	)
}
