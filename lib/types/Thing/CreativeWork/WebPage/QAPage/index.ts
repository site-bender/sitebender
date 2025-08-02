import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export type QAPageType = "QAPage"

export interface QAPageProps {
	"@type"?: QAPageType
}

type QAPage = Thing & CreativeWorkProps & WebPageProps & QAPageProps

export default QAPage
