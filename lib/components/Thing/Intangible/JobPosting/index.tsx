import type BaseProps from "../../../../types/index.ts"
import type { JobPostingProps } from "../../../../types/Thing/Intangible/JobPosting/index.ts"

import Intangible from "../index.tsx"

export type Props = JobPostingProps & BaseProps

export default function JobPosting({
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
	_type = "JobPosting",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
