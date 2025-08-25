import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CommentProps } from "../index.ts"

export type CorrectionCommentType = "CorrectionComment"

export interface CorrectionCommentProps {
	"@type"?: CorrectionCommentType
}

type CorrectionComment =
	& Thing
	& CreativeWorkProps
	& CommentProps
	& CorrectionCommentProps

export default CorrectionComment
