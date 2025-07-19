// ProfilePage extends WebPage but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ProfilePageProps {}

type ProfilePage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& ProfilePageProps

export default ProfilePage
