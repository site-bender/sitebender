import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type ConversationType = "Conversation"

export interface ConversationProps {
	"@type"?: ConversationType
}

type Conversation = Thing & CreativeWorkProps & ConversationProps

export default Conversation
