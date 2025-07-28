import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { OnlineBusinessProps } from "../index.ts"

import OnlineStoreComponent from "../../../../../../components/Thing/Organization/OnlineBusiness/OnlineStore/index.tsx"

export interface OnlineStoreProps {
}

type OnlineStore =
	& Thing
	& OrganizationProps
	& OnlineBusinessProps
	& OnlineStoreProps

export default OnlineStore
