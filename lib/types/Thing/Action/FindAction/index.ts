import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface FindActionProps {}

type FindAction = Thing & ActionProps & FindActionProps

export default FindAction
