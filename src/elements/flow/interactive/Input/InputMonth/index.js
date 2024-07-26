import Input from ".."
import filterDateTimeAttributes from "../utilities/filterDateTimeAttributes"

const InputMonth = Input("Month")(filterDateTimeAttributes)

export default InputMonth
