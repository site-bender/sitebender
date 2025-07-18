import type { URL } from "../../../../DataType/index.ts"
import type CreativeWork from "../../../CreativeWork/index.ts"
import type Service from "../index.ts"

export default interface WebAPI extends Service {
	/** Further documentation describing the Web API in more detail. */
	documentation?: URL | CreativeWork
}
