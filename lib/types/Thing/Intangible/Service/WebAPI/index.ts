import type { URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"
import type CreativeWork from "../../../CreativeWork/index.ts"

import WebAPIComponent from "../../../../../../components/Thing/Intangible/Service/WebAPI/index.tsx"

export interface WebAPIProps {
	documentation?: CreativeWork | URL
}

type WebAPI =
	& Thing
	& IntangibleProps
	& ServiceProps
	& WebAPIProps

export default WebAPI
