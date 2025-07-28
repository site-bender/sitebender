import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { EducationalOccupationalProgramProps } from "../../../../types/Thing/Intangible/EducationalOccupationalProgram/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	EducationalOccupationalProgramProps,
	"EducationalOccupationalProgram",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function EducationalOccupationalProgram({
	applicationDeadline,
	applicationStartDate,
	dayOfWeek,
	educationalCredentialAwarded,
	educationalProgramMode,
	endDate,
	financialAidEligible,
	hasCourse,
	maximumEnrollment,
	numberOfCredits,
	occupationalCategory,
	occupationalCredentialAwarded,
	offers,
	programPrerequisites,
	programType,
	provider,
	salaryUponCompletion,
	startDate,
	termDuration,
	termsPerYear,
	timeOfDay,
	timeToComplete,
	trainingSalary,
	typicalCreditsPerTerm,
	schemaType = "EducationalOccupationalProgram",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				applicationDeadline,
				applicationStartDate,
				dayOfWeek,
				educationalCredentialAwarded,
				educationalProgramMode,
				endDate,
				financialAidEligible,
				hasCourse,
				maximumEnrollment,
				numberOfCredits,
				occupationalCategory,
				occupationalCredentialAwarded,
				offers,
				programPrerequisites,
				programType,
				provider,
				salaryUponCompletion,
				startDate,
				termDuration,
				termsPerYear,
				timeOfDay,
				timeToComplete,
				trainingSalary,
				typicalCreditsPerTerm,
				...subtypeProperties,
			}}
		/>
	)
}
