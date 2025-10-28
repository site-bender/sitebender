import type { URL } from "../../../../DataType/index.ts"
import type CreativeWork from "../../../CreativeWork/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

import CreativeWorkComponent from "../../../../../../../pagewright/src/define/Thing/CreativeWork/index.tsx"

export type WebAPIType = "WebAPI"

export interface WebAPIProps {
	"@type"?: WebAPIType
	documentation?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
}

type WebAPI = Thing & IntangibleProps & ServiceProps & WebAPIProps

export default WebAPI
