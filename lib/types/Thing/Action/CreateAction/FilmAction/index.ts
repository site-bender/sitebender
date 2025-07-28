import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

import FilmActionComponent from "../../../../../../components/Thing/Action/CreateAction/FilmAction/index.tsx"

export interface FilmActionProps {
}

type FilmAction =
	& Thing
	& ActionProps
	& CreateActionProps
	& FilmActionProps

export default FilmAction
