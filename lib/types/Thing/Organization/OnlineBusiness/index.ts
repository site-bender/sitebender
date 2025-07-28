import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import OnlineBusinessComponent from "../../../../../components/Thing/Organization/OnlineBusiness/index.tsx"

export interface OnlineBusinessProps {
}

type OnlineBusiness =
	& Thing
	& OrganizationProps
	& OnlineBusinessProps

export default OnlineBusiness
