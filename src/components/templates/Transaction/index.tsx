import Footer from "~components/page/Footer/index.tsx"
import Header from "~components/page/Header/index.tsx"
import Main from "~components/page/Main/index.tsx"
import MenuWrapper from "~components/wrap/MenuWrapper/index.tsx"

import createElement from "~utilities/createElement/index.ts"

export type Props = JSX.HTMLAttributes<HTMLElement> & {
	route: string
}

export default function Transaction({ children, route, ...props }: Props) {
	return (
		<>
			<Header route={route}>
				<MenuWrapper route={route} />
			</Header>
			<Main class="template" route={route} {...props}>
				<article class="transaction">{children}</article>
			</Main>
			<Footer route={route} />
		</>
	)
}
