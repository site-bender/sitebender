import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

import ReportComponent from "../../../../../../components/Thing/CreativeWork/Article/Report/index.tsx"

export interface ReportProps {
	reportNumber?: Text
}

type Report =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& ReportProps

export default Report
