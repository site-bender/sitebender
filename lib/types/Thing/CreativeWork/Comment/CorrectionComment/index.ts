// CorrectionComment extends Comment but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CommentProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CorrectionCommentProps {}

type CorrectionComment =
	& Thing
	& CommentProps
	& CreativeWorkProps
	& CorrectionCommentProps

export default CorrectionComment
