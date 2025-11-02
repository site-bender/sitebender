import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type { CookActionType } from "./CookAction/index.ts"
import type { DrawActionType } from "./DrawAction/index.ts"
import type { FilmActionType } from "./FilmAction/index.ts"
import type { PaintActionType } from "./PaintAction/index.ts"
import type { PhotographActionType } from "./PhotographAction/index.ts"
import type { WriteActionType } from "./WriteAction/index.ts"

export type CreateActionType =
	| "CreateAction"
	| PhotographActionType
	| CookActionType
	| DrawActionType
	| WriteActionType
	| FilmActionType
	| PaintActionType

export interface CreateActionProps {
	"@type"?: CreateActionType
}

type CreateAction = Thing & ActionProps & CreateActionProps

export default CreateAction
