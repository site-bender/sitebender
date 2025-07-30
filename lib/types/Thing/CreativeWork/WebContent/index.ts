import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface WebContentProps {
	"@type"?: "WebContent"}

type WebContent = Thing & CreativeWorkProps & WebContentProps

export default WebContent
