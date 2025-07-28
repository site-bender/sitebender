import type { URL } from "../../../../DataType/index.ts"
import type CreativeWork from "../../../CreativeWork/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

import CreativeWorkComponent from "../../../../../components/Thing/CreativeWork/index.ts"

export interface WebAPIProps {
	documentation?: CreativeWork | URL | ReturnType<typeof CreativeWorkComponent>
}

type WebAPI = Thing & IntangibleProps & ServiceProps & WebAPIProps

export default WebAPI
