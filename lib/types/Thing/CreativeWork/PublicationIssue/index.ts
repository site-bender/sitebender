import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface PublicationIssueProps {
	issueNumber?: Integer | Text
	pageEnd?: Integer | Text
	pageStart?: Integer | Text
	pagination?: Text
}

type PublicationIssue = Thing & CreativeWorkProps & PublicationIssueProps

export default PublicationIssue
