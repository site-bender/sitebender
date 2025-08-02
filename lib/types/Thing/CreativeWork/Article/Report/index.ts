import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

export type ReportType = "Report"

export interface ReportProps {
	"@type"?: ReportType
	reportNumber?: Text
}

type Report = Thing & CreativeWorkProps & ArticleProps & ReportProps

export default Report
