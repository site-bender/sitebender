import Input from ".."
import filterTextAttributes from "../utilities/filterTextAttributes"

const InputUrl = Input("Url")(filterTextAttributes)

export default InputUrl
