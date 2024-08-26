import Input from ".."
import filterDateTimeAttributes from "../utilities/filterDateTimeAttributes"

const InputDateTimeLocal = Input("DateTime-Local")(filterDateTimeAttributes)

export default InputDateTimeLocal
