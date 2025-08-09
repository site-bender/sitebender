import {
	EMOJI,
	TONE,
} from "~lib/components/semantic/wrappers/constants/index.ts"
import SpokenAs from "~lib/components/semantic/wrappers/SpokenAs/index.tsx"
import WithTone from "~lib/components/semantic/wrappers/WithTone/index.tsx"

export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Wrapper Components - Metadata Components</title>
			<meta
				name="description"
				content="Wrapper components that add semantic meaning and styling to content."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<main>
			<h1>Wrapper Components</h1>

			<section>
				<h2>WithTone Component</h2>
				<p>
					Adds emotional tone and ARIA labels to content for better
					accessibility.
				</p>

				<dl>
					<dt>Happy tone with emoji</dt>
					<dd>
						<WithTone tone={TONE.happy} emoji={EMOJI.happy}>
							I'm so happy to be using this component! It makes my content more
							expressive.
						</WithTone>
					</dd>

					<dt>Sarcastic tone</dt>
					<dd>
						<WithTone tone={TONE.sarcastic} emoji={EMOJI.sarcastic}>
							Oh great, another component library. Just what the world needed.
						</WithTone>
					</dd>

					<dt>Serious tone (no emoji)</dt>
					<dd>
						<WithTone tone={TONE.serious}>
							This is important information that should be taken seriously.
						</WithTone>
					</dd>

					<dt>Excited tone with custom styling</dt>
					<dd>
						<WithTone
							tone={TONE.excited}
							emoji={EMOJI.excited}
							className="highlight"
						>
							This is absolutely amazing news! I can't contain my excitement!
						</WithTone>
					</dd>
				</dl>
			</section>

			<section>
				<h2>SpokenAs Component</h2>
				<p>
					Provides pronunciation guidance for names, technical terms, or
					unfamiliar words.
				</p>

				<dl>
					<dt>Name pronunciation with IPA</dt>
					<dd>
						My last name is{" "}
						<SpokenAs ipa="/mʌˈnɒt/" phonetic="muh-NAHT">
							Munat
						</SpokenAs>, not "moo-not" or "myoo-nat".
					</dd>

					<dt>Technical term with phonetic spelling</dt>
					<dd>
						The <SpokenAs phonetic="giff" ipa="/ɡɪf/">GIF</SpokenAs> vs
						<SpokenAs phonetic="jiff" ipa="/dʒɪf/">GIF</SpokenAs>{" "}
						debate will never end.
					</dd>

					<dt>Foreign word with both IPA and phonetic</dt>
					<dd>
						The French word{" "}
						<SpokenAs ipa="/kʁwasɑ̃/" phonetic="kwah-SAHN">
							croissant
						</SpokenAs>{" "}
						is often mispronounced in English.
					</dd>

					<dt>Place name pronunciation</dt>
					<dd>
						The city of{" "}
						<SpokenAs ipa="/ˈwʊstər/" phonetic="WUSS-ter">
							Worcester
						</SpokenAs>{" "}
						in Massachusetts is notoriously difficult to pronounce.
					</dd>
				</dl>
			</section>

			<style>
				{`
				.highlight {
					background-color: #fffacd;
					padding: 2px 4px;
					border-radius: 3px;
				}
				
				dl {
					margin: 1.5rem 0;
				}
				
				dt {
					font-weight: bold;
					margin-top: 1rem;
					margin-bottom: 0.5rem;
					color: #333;
				}
				
				dd {
					margin-left: 2rem;
					margin-bottom: 1rem;
					padding: 1rem;
					background-color: #f5f5f5;
					border-radius: 4px;
					border-left: 3px solid #ddd;
				}
			`}
			</style>
		</main>
	)
}
