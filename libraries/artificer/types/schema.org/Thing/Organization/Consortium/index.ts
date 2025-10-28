import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export type ConsortiumType = "Consortium"

export interface ConsortiumProps {
	"@type"?: ConsortiumType
}

type Consortium = Thing & OrganizationProps & ConsortiumProps

export default Consortium
