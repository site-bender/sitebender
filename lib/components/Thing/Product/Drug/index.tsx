import type BaseProps from "../../../../types/index.ts"
import type DrugProps from "../../../../types/Thing/Product/Drug/index.ts"

import Product from "../index.tsx"

export type Props = DrugProps & BaseProps

export default function Drug({
	activeIngredient,
	administrationRoute,
	alcoholWarning,
	availableStrength,
	breastfeedingWarning,
	clinicalPharmacology,
	dosageForm,
	doseSchedule,
	drugClass,
	drugUnit,
	foodWarning,
	includedInHealthInsurancePlan,
	interactingDrug,
	isAvailableGenerically,
	isProprietary,
	labelDetails,
	legalStatus,
	maximumIntake,
	mechanismOfAction,
	nonProprietaryName,
	overdosage,
	pregnancyCategory,
	pregnancyWarning,
	prescribingInfo,
	prescriptionStatus,
	proprietaryName,
	relatedDrug,
	rxcui,
	warning,
	_type = "Drug",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Product
			{...props}
			_type={_type}
			subtypeProperties={{
				activeIngredient,
				administrationRoute,
				alcoholWarning,
				availableStrength,
				breastfeedingWarning,
				clinicalPharmacology,
				dosageForm,
				doseSchedule,
				drugClass,
				drugUnit,
				foodWarning,
				includedInHealthInsurancePlan,
				interactingDrug,
				isAvailableGenerically,
				isProprietary,
				labelDetails,
				legalStatus,
				maximumIntake,
				mechanismOfAction,
				nonProprietaryName,
				overdosage,
				pregnancyCategory,
				pregnancyWarning,
				prescribingInfo,
				prescriptionStatus,
				proprietaryName,
				relatedDrug,
				rxcui,
				warning,
				...subtypeProperties,
			}}
		/>
	)
}
