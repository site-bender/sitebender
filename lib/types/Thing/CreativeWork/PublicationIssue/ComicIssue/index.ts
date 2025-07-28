import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { PublicationIssueProps } from "../index.ts"
import type Person from "../../../Person/index.ts"

import ComicIssueComponent from "../../../../../../components/Thing/CreativeWork/PublicationIssue/ComicIssue/index.tsx"

export interface ComicIssueProps {
	artist?: Person
	colorist?: Person
	inker?: Person
	letterer?: Person
	penciler?: Person
	variantCover?: Text
}

type ComicIssue =
	& Thing
	& CreativeWorkProps
	& PublicationIssueProps
	& ComicIssueProps

export default ComicIssue
