import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { EducationalOccupationalProgramProps } from "../../../../../types/Thing/Intangible/EducationalOccupationalProgram/index.ts"
import type { WorkBasedProgramProps } from "../../../../../types/Thing/Intangible/EducationalOccupationalProgram/WorkBasedProgram/index.ts"

import EducationalOccupationalProgram from "../index.tsx"

export type Props = BaseComponentProps<
	WorkBasedProgramProps,
	"WorkBasedProgram",
	ExtractLevelProps<ThingProps, IntangibleProps, EducationalOccupationalProgramProps>
>

export default function WorkBasedProgram({
	occupationalCategory,
	trainingSalary,
	schemaType = "WorkBasedProgram",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<EducationalOccupationalProgram
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				occupationalCategory,
				trainingSalary,
				...subtypeProperties,
			}}
		/>
	)
}
