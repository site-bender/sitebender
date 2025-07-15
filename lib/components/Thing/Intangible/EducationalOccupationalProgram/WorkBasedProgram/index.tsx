import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EducationalOccupationalProgramProps from "../../../../../types/Thing/EducationalOccupationalProgram/index.ts"
import type WorkBasedProgramProps from "../../../../../types/Thing/WorkBasedProgram/index.ts"

import EducationalOccupationalProgram from "./index.tsx"

// WorkBasedProgram adds no properties to the EducationalOccupationalProgram schema type
export type Props = BaseComponentProps<
	WorkBasedProgramProps,
	"WorkBasedProgram",
	ExtractLevelProps<WorkBasedProgramProps, EducationalOccupationalProgramProps>
>

export default function WorkBasedProgram({
	schemaType = "WorkBasedProgram",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<EducationalOccupationalProgram
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
