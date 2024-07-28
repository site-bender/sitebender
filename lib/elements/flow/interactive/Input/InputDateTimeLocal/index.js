import Input from ".."
import filterDateTimeAttributes from "../utilities/filterDateTimeAttributes"

const InputDateTimeLocal = Input("DateTimeLocal")(filterDateTimeAttributes)

export default InputDateTimeLocal
