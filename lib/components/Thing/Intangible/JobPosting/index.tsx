import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type JobPostingProps from "../../../../types/Thing/JobPosting/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	JobPostingProps,
	"JobPosting",
	ExtractLevelProps<JobPostingProps, IntangibleProps>
>

export default function JobPosting(
	{
		applicantLocationRequirements,
		applicationContact,
		baseSalary,
		benefits,
		datePosted,
		directApply,
		educationRequirements,
		eligibilityToWorkRequirement,
		employerOverview,
		employmentType,
		employmentUnit,
		estimatedSalary,
		experienceInPlaceOfEducation,
		experienceRequirements,
		hiringOrganization,
		incentiveCompensation,
		incentives,
		industry,
		jobBenefits,
		jobImmediateStart,
		jobLocation,
		jobLocationType,
		jobStartDate,
		occupationalCategory,
		physicalRequirement,
		qualifications,
		relevantOccupation,
		responsibilities,
		salaryCurrency,
		securityClearanceRequirement,
		sensoryRequirement,
		skills,
		specialCommitments,
		title,
		totalJobOpenings,
		validThrough,
		workHours,
		schemaType = "JobPosting",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				applicantLocationRequirements,
				applicationContact,
				baseSalary,
				benefits,
				datePosted,
				directApply,
				educationRequirements,
				eligibilityToWorkRequirement,
				employerOverview,
				employmentType,
				employmentUnit,
				estimatedSalary,
				experienceInPlaceOfEducation,
				experienceRequirements,
				hiringOrganization,
				incentiveCompensation,
				incentives,
				industry,
				jobBenefits,
				jobImmediateStart,
				jobLocation,
				jobLocationType,
				jobStartDate,
				occupationalCategory,
				physicalRequirement,
				qualifications,
				relevantOccupation,
				responsibilities,
				salaryCurrency,
				securityClearanceRequirement,
				sensoryRequirement,
				skills,
				specialCommitments,
				title,
				totalJobOpenings,
				validThrough,
				workHours,
				...subtypeProperties,
			}}
		/>
	)
}
