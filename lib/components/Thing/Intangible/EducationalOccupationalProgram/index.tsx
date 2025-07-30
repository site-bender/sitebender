import type BaseProps from "../../../../types/index.ts"
import type EducationalOccupationalProgramProps from "../../../../types/Thing/Intangible/EducationalOccupationalProgram/index.ts"

import Intangible from "../index.tsx"

export type Props = EducationalOccupationalProgramProps & BaseProps

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
	_type = "EducationalOccupationalProgram",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
		>{children}</Intangible>
	)
}
