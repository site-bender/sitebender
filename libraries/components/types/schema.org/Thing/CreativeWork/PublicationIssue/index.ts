import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { ComicIssueType } from "./ComicIssue/index.ts"

export type PublicationIssueType = "PublicationIssue" | ComicIssueType

export interface PublicationIssueProps {
	"@type"?: PublicationIssueType
	issueNumber?: Integer | Text
	pageEnd?: Integer | Text
	pageStart?: Integer | Text
	pagination?: Text
}

type PublicationIssue = Thing & CreativeWorkProps & PublicationIssueProps

export default PublicationIssue
