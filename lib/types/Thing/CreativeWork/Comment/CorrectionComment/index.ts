import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CommentProps } from "../index.ts"

import CorrectionCommentComponent from "../../../../../../components/Thing/CreativeWork/Comment/CorrectionComment/index.tsx"

export interface CorrectionCommentProps {
}

type CorrectionComment =
	& Thing
	& CreativeWorkProps
	& CommentProps
	& CorrectionCommentProps

export default CorrectionComment
