import { Boolean, Text } from "../../../DataType/index.ts"
import MedicalEnumeration from "../../Intangible/Enumeration/MedicalEnumeration/index.ts"
import MaximumDoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"
import RecommendedDoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/RecommendedDoseSchedule/index.ts"
import DrugLegalStatus from "../../MedicalEntity/MedicalIntangible/DrugLegalStatus/index.ts"
import Product from "../index.ts"

export default interface DietarySupplement extends Product {
	/** An active ingredient, typically chemical compounds and/or biologic substances. */
	activeIngredient?: Text
	/** True if this item's name is a proprietary/brand name (vs. generic name). */
	isProprietary?: Boolean
	/** The drug or supplement's legal status, including any controlled substance schedules that apply. */
	legalStatus?: MedicalEnumeration | DrugLegalStatus | Text
	/** Recommended intake of this supplement for a given population as defined by a specific recommending authority. */
	maximumIntake?: MaximumDoseSchedule
	/** The specific biochemical interaction through which this drug or supplement produces its pharmacological effect. */
	mechanismOfAction?: Text
	/** The generic name of this drug or supplement. */
	nonProprietaryName?: Text
	/** Proprietary name given to the diet plan, typically by its originator or creator. */
	proprietaryName?: Text
	/** Recommended intake of this supplement for a given population as defined by a specific recommending authority. */
	recommendedIntake?: RecommendedDoseSchedule
	/** Any potential safety concern associated with the supplement. May include interactions with other drugs and foods, pregnancy, breastfeeding, known adverse reactions, and documented efficacy of the supplement. */
	safetyConsideration?: Text
	/** Characteristics of the population for which this is intended, or which typically uses it, e.g. 'adults'. */
	targetPopulation?: Text
}
