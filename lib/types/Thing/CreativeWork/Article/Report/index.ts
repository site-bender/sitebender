import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

export interface ReportProps {
	/** The number or other unique designator assigned to a Report by the publishing organization. */
	reportNumber?: Text
}

type Report =
	& Thing
	& ArticleProps
	& CreativeWorkProps
	& ReportProps

export default Report
