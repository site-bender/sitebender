import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Person from "../../../Person/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { PublicationIssueProps } from "../index.ts"

import PersonComponent from "../../../../../../../pagewright/src/define/Thing/Person/index.tsx"

export type ComicIssueType = "ComicIssue"

export interface ComicIssueProps {
	"@type"?: ComicIssueType
	artist?: Person | ReturnType<typeof PersonComponent>
	colorist?: Person | ReturnType<typeof PersonComponent>
	inker?: Person | ReturnType<typeof PersonComponent>
	letterer?: Person | ReturnType<typeof PersonComponent>
	penciler?: Person | ReturnType<typeof PersonComponent>
	variantCover?: Text
}

type ComicIssue =
	& Thing
	& CreativeWorkProps
	& PublicationIssueProps
	& ComicIssueProps

export default ComicIssue
