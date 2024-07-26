import Constant from "../../../injectors/constructors/Constant"
import Add from "../constructors/Add"
import Divide from "../constructors/Divide"
import divide from "../divide"

const average = op => arg =>
	divide(
		Divide("Number")(Add("Number")(op.operands))(
			Constant("Number")(op.operands.length),
		),
	)(arg)

export default average
