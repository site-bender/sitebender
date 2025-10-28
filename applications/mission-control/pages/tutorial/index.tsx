import SetQueryString from "@sitebender/architect/transform/actions/SetQueryString/index.tsx"
import NotEmpty from "@sitebender/architect/transform/comparators/NotEmpty/index.tsx"
import If from "@sitebender/architect/transform/control/If/index.tsx"
import On from "@sitebender/architect/transform/control/On/index.tsx"
import Program from "@sitebender/architect/transform/control/Program/index.tsx"
import SetValue from "@sitebender/architect/transform/do/SetValue/index.tsx"
import Constant from "@sitebender/architect/transform/injectors/Constant/index.tsx"
import FromElement from "@sitebender/architect/transform/injectors/FromElement/index.tsx"
import Add from "@sitebender/architect/transform/operators/Add/index.tsx"

// compileToArchitect no longer needed directly here

export default function Tutorial() {
	return (
		<body>
			<h1>Artificer Tutorial (JSX)</h1>
			<p>
				These behaviors are authored with JSX components and hydrated on the
				client.
			</p>

			<label for="name">Your name</label>
			<input id="name" data-ir-id="name" />
			<p>
				Hello, <span id="out">(none)</span>
			</p>

			<form id="profile" data-ir-id="profile" action="/ignored-by-artificer">
				<input
					name="favorite"
					id="favorite"
					placeholder="Favorite thing"
				/>
				<button type="submit">Save</button>
			</form>

			<p id="msg" aria-live="polite"></p>

			<input id="a" data-ir-id="a" inputmode="numeric" placeholder="A" />
			<input id="b" data-ir-id="b" inputmode="numeric" placeholder="B" />
			= <span id="sum">0</span>

			{/* Inline authored behaviors; Program compiles to IR script */}
			<Program>
				<On event="Input">
					<SetValue
						selector="#out"
						value={<FromElement id="name" type="String" />}
					/>
				</On>

				<On event="Submit" target="profile">
					<SetQueryString
						key="favorite"
						value={<FromElement id="favorite" type="String" />}
					/>
				</On>

				<On event="Blur" target="name">
					<If
						condition={
							<NotEmpty>
								<FromElement id="name" type="String" />
							</NotEmpty>
						}
					>
						<SetValue
							selector="#msg"
							value={<Constant value="Looks good." />}
						/>
						<SetValue
							selector="#msg"
							value={<Constant value="Name is required." />}
						/>
					</If>
				</On>

				<On event="Input" target="a">
					<SetValue
						selector="#sum"
						value={
							<Add type="Number">
								<FromElement id="a" type="String" />
								<FromElement id="b" type="String" />
							</Add>
						}
					/>
				</On>

				<On event="Input" target="b">
					<SetValue
						selector="#sum"
						value={
							<Add type="Number">
								<FromElement id="a" type="String" />
								<FromElement id="b" type="String" />
							</Add>
						}
					/>
				</On>
			</Program>

			{/* Hydrate using pre-bundled client script */}
			<script type="module" src="/scripts/hydrate/adaptive.js"></script>
		</body>
	)
}
