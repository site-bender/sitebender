import type BaseProps from "../../../../types/index.ts"
import type CourseProps from "../../../../types/Thing/CreativeWork/Course/index.ts"

import CreativeWork from "../index.tsx"

export type Props = CourseProps & BaseProps

export default function Course({
	availableLanguage,
	courseCode,
	coursePrerequisites,
	educationalCredentialAwarded,
	financialAidEligible,
	hasCourseInstance,
	numberOfCredits,
	occupationalCredentialAwarded,
	syllabusSections,
	totalHistoricalEnrollment,
	_type = "Course",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				availableLanguage,
				courseCode,
				coursePrerequisites,
				educationalCredentialAwarded,
				financialAidEligible,
				hasCourseInstance,
				numberOfCredits,
				occupationalCredentialAwarded,
				syllabusSections,
				totalHistoricalEnrollment,
				...subtypeProperties,
			}}
		/>
	)
}
