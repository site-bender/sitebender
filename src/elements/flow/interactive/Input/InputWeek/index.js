import Input from ".."
import filterDateTimeAttributes from "../utilities/filterDateTimeAttributes"

const InputWeek = Input("Week")(filterDateTimeAttributes)

export default InputWeek
