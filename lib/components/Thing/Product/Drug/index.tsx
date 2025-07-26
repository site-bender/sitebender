import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type { MedicalEntityProps } from "../../../../types/Thing/MedicalEntity/index.ts"
import type { SubstanceProps } from "../../../../types/Thing/MedicalEntity/Substance/index.ts"
import type DrugProps from "../../../../types/Thing/Product/Drug/index.ts"
import type { ProductProps } from "../../../../types/Thing/Product/index.ts"

import Base from "../../../Base/index.tsx"
import Thing from "../../index.tsx"
import MedicalEntity from "../../MedicalEntity/index.tsx"
import Substance from "../../MedicalEntity/Substance/index.tsx"
import Product from "../index.tsx"

export type Props = BaseComponentProps<
	DrugProps,
	"Drug",
	ExtractLevelProps<
		DrugProps,
		ProductProps & MedicalEntityProps & SubstanceProps
	>
>

export default function Drug(props: Props) {
	// Destructure Drug-specific props
	const {
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
		format,
		...restProps
	} = props

	// Call component functions as pure data transformers
	const thingData = Thing(restProps)
	const productData = Product(restProps)
	const medicalEntityData = MedicalEntity(restProps)
	const substanceData = Substance(restProps)

	// Return JSX using Base internally
	return (
		<Base
			element="article"
			format={format || "{{name}} ({{dosageForm}} {{drugUnit}})"}
			props={{
				// Compose all the data from the hierarchy
				...thingData.props,
				...productData.props,
				...medicalEntityData.props,
				...substanceData.props,
				// Add Drug-specific props
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
			}}
		/>
	)
}
