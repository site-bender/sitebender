import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RoleProps } from "../index.ts"
import type Language from "../../Language/index.ts"

import LinkRoleComponent from "../../../../../../components/Thing/Intangible/Role/LinkRole/index.tsx"

export interface LinkRoleProps {
	inLanguage?: Language | Text
	linkRelationship?: Text
}

type LinkRole =
	& Thing
	& IntangibleProps
	& RoleProps
	& LinkRoleProps

export default LinkRole
