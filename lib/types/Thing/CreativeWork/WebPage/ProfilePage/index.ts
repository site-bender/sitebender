import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export interface ProfilePageProps {}

type ProfilePage = Thing & CreativeWorkProps & WebPageProps & ProfilePageProps

export default ProfilePage
