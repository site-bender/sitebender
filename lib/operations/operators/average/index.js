import Constant from "../../../injectors/constructors/Constant"
import Add from "../constructors/Add"
import Divide from "../constructors/Divide"
import divide from "../divide"

const average = op => async (arg, localValues) =>
	await divide(
		Divide("Number")(Add("Number")(op.operands))(
			Constant("Number")(op.operands.length),
		),
	)(arg, localValues)

export default average
