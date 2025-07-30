import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Language from "../../Language/index.ts"
import type { RoleProps } from "../index.ts"

import LanguageComponent from "../../../../../components/Thing/Intangible/Language/index.ts"

export interface LinkRoleProps {
	"@type"?: "LinkRole"
	inLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	linkRelationship?: Text
}

type LinkRole = Thing & IntangibleProps & RoleProps & LinkRoleProps

export default LinkRole
