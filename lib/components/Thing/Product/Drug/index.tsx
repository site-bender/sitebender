import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { ProductProps } from "../../../../types/Thing/Product/index.ts"
import type { DrugProps } from "../../../../types/Thing/Product/Drug/index.ts"

import Product from "../index.tsx"

export type Props = BaseComponentProps<
	DrugProps,
	"Drug",
	ExtractLevelProps<ThingProps, ProductProps>
>

export default function Drug({
	activeIngredient,
	administrationRoute,
	alcoholWarning,
	availableStrength,
	breastfeedingWarning,
	clincalPharmacology,
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
	schemaType = "Drug",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Product
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				activeIngredient,
				administrationRoute,
				alcoholWarning,
				availableStrength,
				breastfeedingWarning,
				clincalPharmacology,
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
