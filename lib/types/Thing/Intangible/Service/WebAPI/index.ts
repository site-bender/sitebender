import type { URL } from "../../../../DataType/index.ts"
import type CreativeWork from "../../../CreativeWork/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

export interface WebAPIProps {
	/** Further documentation describing the Web API in more detail. */
	documentation?: URL | CreativeWork
}

type WebAPI =
	& Thing
	& IntangibleProps
	& ServiceProps
	& WebAPIProps

export default WebAPI
