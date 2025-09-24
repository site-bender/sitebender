import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Language from "../../../Intangible/Language/index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

import LanguageComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Language/index.tsx"

export type WriteActionType = "WriteAction"

export interface WriteActionProps {
	"@type"?: WriteActionType
	inLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	language?: Language | ReturnType<typeof LanguageComponent>
}

type WriteAction = Thing & ActionProps & CreateActionProps & WriteActionProps

export default WriteAction
