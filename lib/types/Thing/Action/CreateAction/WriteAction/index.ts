import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"
import type Language from "../../../Intangible/Language/index.ts"

export interface WriteActionProps {
	inLanguage?: Language | Text
	language?: Language
}

type WriteAction =
	& Thing
	& ActionProps
	& CreateActionProps
	& WriteActionProps

export default WriteAction
