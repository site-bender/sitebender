import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface CreateActionProps {}

type CreateAction = Thing & ActionProps & CreateActionProps

export default CreateAction
