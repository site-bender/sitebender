import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface AchieveActionProps {}

type AchieveAction = Thing & ActionProps & AchieveActionProps

export default AchieveAction
