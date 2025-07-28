import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AchieveActionProps } from "../index.ts"

export interface TieActionProps {}

type TieAction = Thing & ActionProps & AchieveActionProps & TieActionProps

export default TieAction
