import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { CourseProps } from "../../../../types/Thing/CreativeWork/Course/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	CourseProps,
	"Course",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

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
	schemaType = "Course",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
