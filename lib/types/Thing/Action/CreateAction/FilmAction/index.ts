import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

export interface FilmActionProps {
}

type FilmAction =
	& Thing
	& ActionProps
	& CreateActionProps
	& FilmActionProps

export default FilmAction
