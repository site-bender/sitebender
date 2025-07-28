import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface ConsortiumProps {}

type Consortium = Thing & OrganizationProps & ConsortiumProps

export default Consortium
