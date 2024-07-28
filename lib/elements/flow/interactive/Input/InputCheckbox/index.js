import Input from ".."
import filterCheckedAttributes from "../utilities/filterCheckedAttributes"

const InputCheckbox = Input("Checkbox")(filterCheckedAttributes)

export default InputCheckbox
