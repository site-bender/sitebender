import type { Language } from "../../../../bcp47/index.ts"
import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

export interface WriteActionProps {
	/** The language of the content or performance or used in an action. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[availableLanguage]]. */
	inLanguage?: Text | Language
	/** A sub property of instrument. The language used on this action. */
	language?: Language
}

type WriteAction =
	& Thing
	& ActionProps
	& CreateActionProps
	& WriteActionProps

export default WriteAction
