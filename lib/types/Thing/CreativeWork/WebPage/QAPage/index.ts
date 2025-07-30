import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export interface QAPageProps {
	"@type"?: "QAPage"}

type QAPage = Thing & CreativeWorkProps & WebPageProps & QAPageProps

export default QAPage
