import type { Boolean, Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface PropertyValueSpecificationProps {
	/** The default value of the input.  For properties that expect a literal, the default is a literal value, for properties that expect an object, it's an ID reference to one of the current values. */
	defaultValue?: Thing | Text
	/** The upper value of some characteristic or property. */
	maxValue?: Number
	/** The lower value of some characteristic or property. */
	minValue?: Number
	/** Whether multiple values are allowed for the property.  Default is false. */
	multipleValues?: Boolean
	/** Whether or not a property is mutable.  Default is false. Specifying this for a property that also has a value makes it act similar to a "hidden" input in an HTML form. */
	readonlyValue?: Boolean
	/** The stepValue attribute indicates the granularity that is expected (and required) of the value in a PropertyValueSpecification. */
	stepValue?: Number
	/** Specifies the allowed range for number of characters in a literal value. */
	valueMaxLength?: Number
	/** Specifies the minimum allowed range for number of characters in a literal value. */
	valueMinLength?: Number
	/** Indicates the name of the PropertyValueSpecification to be used in URL templates and form encoding in a manner analogous to HTML's input@name. */
	valueName?: Text
	/** Specifies a regular expression for testing literal values according to the HTML spec. */
	valuePattern?: Text
	/** Whether the property must be filled in to complete the action.  Default is false. */
	valueRequired?: Boolean
}

type PropertyValueSpecification =
	& Thing
	& IntangibleProps
	& PropertyValueSpecificationProps

export default PropertyValueSpecification
