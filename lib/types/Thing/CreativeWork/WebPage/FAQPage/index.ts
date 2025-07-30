import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export interface FAQPageProps {
	"@type"?: "FAQPage"}

type FAQPage = Thing & CreativeWorkProps & WebPageProps & FAQPageProps

export default FAQPage
