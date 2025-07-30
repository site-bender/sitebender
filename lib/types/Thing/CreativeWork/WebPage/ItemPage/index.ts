import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export interface ItemPageProps {
	"@type"?: "ItemPage"}

type ItemPage = Thing & CreativeWorkProps & WebPageProps & ItemPageProps

export default ItemPage
