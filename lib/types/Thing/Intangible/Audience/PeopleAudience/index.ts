import { Integer, Number, Text } from "../../../../DataType/index.ts"
import MedicalCondition from "../../../MedicalEntity/MedicalCondition/index.ts"
import GenderType from "../../Enumeration/GenderType/index.ts"
import QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import Audience from "../index.ts"

export default interface PeopleAudience extends Audience {
	/** Specifying the health condition(s) of a patient, medical study, or other target audience. */
	healthCondition?: MedicalCondition
	/** Audiences defined by a person's gender. */
	requiredGender?: Text
	/** Audiences defined by a person's maximum age. */
	requiredMaxAge?: Integer
	/** Audiences defined by a person's minimum age. */
	requiredMinAge?: Integer
	/** The age or age range for the intended audience or person, for example 3-12 months for infants, 1-5 years for toddlers. */
	suggestedAge?: QuantitativeValue
	/** The suggested gender of the intended person or audience, for example "male", "female", or "unisex". */
	suggestedGender?: GenderType | Text
	/** Maximum recommended age in years for the audience or user. */
	suggestedMaxAge?: Number
	/** A suggested range of body measurements for the intended audience or person, for example inseam between 32 and 34 inches or height between 170 and 190 cm. Typically found on a size chart for wearable products. */
	suggestedMeasurement?: QuantitativeValue
	/** Minimum recommended age in years for the audience or user. */
	suggestedMinAge?: Number
}
