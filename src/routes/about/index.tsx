import Page from "~components/templates/Page/index.tsx"

import { Fragment } from "~utilities/createElement/index.ts"

export type Props = {
	route?: string
}

// Head elements for this page - will be extracted by the build system
export function Head() {
	return (
		<>
			<title>About</title>
			<meta name="description" content="Learn more about us and what we do." />
			<link rel="stylesheet" href="/styles/pages/about/index.css" />
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<Page route={route}>
			<h1>About us</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit
				nisl pellentesque urna dictum finibus. Mauris id risus sed quam ornare
				pulvinar. Vestibulum quis consequat dolor, sit amet fringilla nulla.
				Vivamus diam arcu, mollis at erat in, convallis porta nibh. In consequat
				tellus eu massa tincidunt, non ultrices ligula condimentum. Cras maximus
				dignissim ligula non varius. Ut finibus aliquam metus, et semper eros
				imperdiet ac. Aenean mollis felis vel eros fermentum gravida. Donec leo
				odio, sollicitudin ac dolor ac, scelerisque tristique nibh. Phasellus
				nulla mi, eleifend a arcu quis, hendrerit volutpat eros.
			</p>
			<p>
				Mauris cursus, libero at lobortis mattis, tellus quam tristique nisi, in
				ultricies erat nisi in nulla. Nam vel nibh a neque dignissim hendrerit.
				Sed at felis hendrerit, consequat neque at, dapibus arcu. Aliquam erat
				volutpat. In quis urna eu enim convallis aliquam. Quisque massa urna,
				posuere rutrum luctus sit amet, volutpat vel ipsum. Pellentesque libero
				enim, tincidunt quis pharetra vulputate, sagittis nec lacus.
				Pellentesque velit eros, aliquam a iaculis non, ultrices non ante.
				Vestibulum sed faucibus eros. Maecenas justo ligula, finibus nec
				scelerisque vulputate, auctor eu risus. Nam rhoncus lorem fringilla
				ligula mattis dictum.
			</p>
			<p>
				Mauris non dignissim dui. Vestibulum quis est nulla. Pellentesque in
				aliquet lectus, ac feugiat lectus. Proin ac massa a lectus sodales
				mattis ut non ligula. Nulla facilisis risus ac lorem interdum, a
				venenatis lacus convallis. Nullam elementum sapien a felis porta, a
				iaculis leo pretium. Proin dictum, diam sit amet tristique elementum,
				turpis enim iaculis ante, et lacinia mauris risus viverra nulla. Vivamus
				vel erat ultrices, elementum purus ac, consectetur dui. Etiam vitae
				dapibus magna. Pellentesque ultricies elit sed ex elementum convallis.
				Integer convallis, metus quis ultricies eleifend, nibh erat porttitor
				tellus, ac accumsan odio erat sed mi. Ut nisi mi, ullamcorper in semper
				sit amet, cursus vel mi. Proin ut ultrices massa, at dapibus elit.
			</p>
			<p>
				Donec ac sapien vel libero blandit mollis. Nunc consequat quam massa,
				finibus rutrum libero vulputate at. Aenean porttitor, quam in cursus
				interdum, massa erat dapibus est, id sodales nunc urna non nunc. Nunc
				condimentum tristique lectus, feugiat consequat purus. Cras at cursus
				nisl. Quisque fringilla, orci ut commodo viverra, urna nulla sagittis
				leo, vel finibus dolor ante nec nisi. Suspendisse dictum mi sed lobortis
				egestas. Proin id lobortis est. Duis odio mauris, euismod vel orci sit
				amet, interdum vehicula augue.
			</p>
			<p>
				Praesent eget dolor ac ipsum imperdiet lacinia vitae id neque.
				Pellentesque nec lorem id tortor porta bibendum quis sed tellus. Aenean
				ac mi ut urna eleifend egestas. Sed sollicitudin imperdiet nulla in
				dapibus. Morbi tincidunt tincidunt purus, et tempor purus gravida sit
				amet. Proin sed augue vel neque aliquet bibendum. Aliquam erat volutpat.
				Duis aliquet ipsum odio, ut gravida lorem porttitor at. Sed elementum
				ornare justo, eu accumsan turpis pretium at. Aliquam iaculis nulla nec
				mauris bibendum semper. Pellentesque habitant morbi tristique senectus
				et netus et malesuada fames ac turpis egestas.
			</p>
			<p>
				Aliquam non placerat ante. Donec sit amet arcu tortor. Fusce cursus
				dolor nec condimentum posuere. In dignissim lacus tellus, ut laoreet
				turpis volutpat ac. Aenean scelerisque augue nibh. Aliquam egestas dui
				vitae lorem congue, vel ullamcorper massa sodales. Aliquam eget arcu
				dui. Cras aliquet libero eu nibh lobortis, id aliquam turpis dignissim.
				Nullam magna ante, accumsan in ex vel, hendrerit ultricies risus.
				Praesent sed mi quam. Nulla suscipit suscipit mi vel dapibus.
				Suspendisse sit amet blandit sem. Donec et ex ut metus feugiat viverra
				vitae eu elit.
			</p>
			<p>
				Pellentesque habitant morbi tristique senectus et netus et malesuada
				fames ac turpis egestas. Donec mattis at sapien et ultrices. Quisque
				dignissim lorem vel neque pulvinar, vehicula tristique leo hendrerit.
				Etiam rutrum risus eget magna finibus facilisis. Aenean luctus rhoncus
				orci eleifend volutpat. Integer ut ipsum purus. Nullam vel dui quis quam
				commodo aliquam. Sed eu justo elementum, vehicula est nec, lobortis
				tortor. Aenean id ante sem. Phasellus quis ligula quis ligula congue
				laoreet. Aenean at placerat nibh, eu fermentum tortor. Maecenas dictum
				feugiat maximus. Aliquam id gravida risus. Vestibulum aliquet commodo
				arcu, sit amet vulputate purus pretium id. Duis accumsan, mauris eu
				egestas pellentesque, tortor ante mollis tortor, sed eleifend massa nibh
				eget enim.
			</p>
			<p>
				Phasellus eget sodales dui. Mauris nec augue nunc. Sed non neque augue.
				Sed fermentum purus odio, a semper tellus luctus a. Etiam ac ante a
				purus semper pulvinar vel sit amet ante. Nulla tristique porta turpis,
				ut placerat velit sodales a. Proin interdum mi feugiat volutpat
				porttitor. In enim tortor, vulputate sed posuere egestas, gravida et ex.
				Mauris consectetur felis id mi suscipit condimentum. Nam egestas feugiat
				mattis. Sed varius quam eu quam ultricies suscipit. Proin aliquet risus
				a faucibus suscipit. Suspendisse vel tellus est. Fusce fringilla auctor
				orci, non hendrerit ipsum tempor sed. Sed eu lacus pellentesque, lacinia
				eros ut, sagittis massa. In massa mauris, feugiat ac tristique a,
				venenatis a tellus.
			</p>
			<p>
				Nam in imperdiet quam, eget sodales diam. Ut arcu enim, vehicula sit
				amet posuere eu, blandit ut sem. Quisque finibus velit id eros
				sollicitudin tristique. Phasellus hendrerit rhoncus dolor eu luctus.
				Suspendisse sapien lacus, dignissim non vulputate nec, dictum quis sem.
				Ut luctus semper blandit. Sed sed justo eros. Donec est nisl, gravida in
				ante finibus, dapibus semper urna. Praesent vestibulum lectus eget
				iaculis porta. Aenean lacinia lorem eleifend leo condimentum varius.
				Proin efficitur, velit in finibus egestas, turpis diam molestie erat,
				vitae vehicula elit erat et felis.
			</p>
			<p>
				In facilisis at sapien id pellentesque. Pellentesque vestibulum mauris a
				auctor vulputate. Sed nec orci felis. Phasellus dignissim neque vel
				tortor feugiat, sit amet sagittis eros ultricies. Ut interdum finibus
				dapibus. Nullam lorem nunc, commodo nec neque non, scelerisque gravida
				metus. Proin sit amet augue ac arcu dignissim malesuada.
			</p>
		</Page>
	)
}
