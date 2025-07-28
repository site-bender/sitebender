import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

import QAPageComponent from "../../../../../../components/Thing/CreativeWork/WebPage/QAPage/index.tsx"

export interface QAPageProps {
}

type QAPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& QAPageProps

export default QAPage
