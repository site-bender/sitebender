import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface ComputerLanguageProps {}

type ComputerLanguage = Thing & IntangibleProps & ComputerLanguageProps

export default ComputerLanguage
