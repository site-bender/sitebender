import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type LegislationProps from "../../../../types/Thing/Legislation/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	LegislationProps,
	"Legislation",
	ExtractLevelProps<LegislationProps, CreativeWorkProps>
>

export default function Legislation(
	{
		jurisdiction,
		legislationAmends,
		legislationApplies,
		legislationChanges,
		legislationCommences,
		legislationConsolidates,
		legislationCorrects,
		legislationCountersignedBy,
		legislationDate,
		legislationDateOfApplicability,
		legislationDateVersion,
		legislationEnsuresImplementationOf,
		legislationIdentifier,
		legislationJurisdiction,
		legislationLegalForce,
		legislationPassedBy,
		legislationRepeals,
		legislationResponsible,
		legislationTransposes,
		legislationType,
		schemaType = "Legislation",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				jurisdiction,
				legislationAmends,
				legislationApplies,
				legislationChanges,
				legislationCommences,
				legislationConsolidates,
				legislationCorrects,
				legislationCountersignedBy,
				legislationDate,
				legislationDateOfApplicability,
				legislationDateVersion,
				legislationEnsuresImplementationOf,
				legislationIdentifier,
				legislationJurisdiction,
				legislationLegalForce,
				legislationPassedBy,
				legislationRepeals,
				legislationResponsible,
				legislationTransposes,
				legislationType,
				...subtypeProperties,
			}}
		/>
	)
}
