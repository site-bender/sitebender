import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

export type FilmActionType = "FilmAction"

export interface FilmActionProps {
	"@type"?: FilmActionType
}

type FilmAction = Thing & ActionProps & CreateActionProps & FilmActionProps

export default FilmAction
