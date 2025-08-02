import type BaseProps from "../../../../types/index.ts"
import type LegislationProps from "../../../../types/Thing/CreativeWork/Legislation/index.ts"

import CreativeWork from "../index.tsx"

export type Props = LegislationProps & BaseProps

export default function Legislation({
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
	_type = "Legislation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
		>
			{children}
		</CreativeWork>
	)
}
