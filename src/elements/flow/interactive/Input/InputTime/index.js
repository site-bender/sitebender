import Input from ".."
import filterDateTimeAttributes from "../utilities/filterDateTimeAttributes"

const InputTime = Input("Time")(filterDateTimeAttributes)

export default InputTime
