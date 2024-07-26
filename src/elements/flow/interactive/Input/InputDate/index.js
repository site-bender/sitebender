import Input from ".."
import filterDateTimeAttributes from "../utilities/filterDateTimeAttributes"

const InputDate = Input("Date")(filterDateTimeAttributes)

export default InputDate
