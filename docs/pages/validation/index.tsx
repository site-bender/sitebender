import SetValue from "@sitebender/components/transform/actions/SetValue/index.tsx"
import NotEmpty from "@sitebender/components/transform/comparators/NotEmpty/index.tsx"
import If from "@sitebender/components/transform/control/If/index.tsx"
import On from "@sitebender/components/transform/control/On/index.tsx"
import Program from "@sitebender/components/transform/control/Program/index.tsx"
import Constant from "@sitebender/components/transform/injectors/Constant/index.tsx"
import FromElement from "@sitebender/components/transform/injectors/FromElement/index.tsx"

import createElement from "~utilities/createElement/index.ts"

export default function ValidationDemo() {
	return (
		<body>
			<h1>Validation Demo</h1>
			<p>Type in the field; leaving it empty will show a required message.</p>
			<form id="val-form" data-ir-id="val-form">
				<label for="name">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					data-ir-id="name_input"
					required
					aria-describedby="name-error"
				/>
				<span id="name-error" role="alert" aria-live="polite"></span>
				<div style="margin-top: 1rem">
					<button type="submit">Submit</button>
				</div>
			</form>
			{/* Inline authored behaviors compiled to IR, hydrated by shared client */}
			<Program>
				{/* On input: clear or set error based on value */}
				<On event="Input" target="name_input">
					<If
						condition={
							<NotEmpty>
								<FromElement id="name" type="String" />
							</NotEmpty>
						}
					>
						<SetValue selector="#name-error" value={<Constant value="" />} />
						<SetValue
							selector="#name-error"
							value={<Constant value="Required" />}
						/>
					</If>
				</On>

				{/* On blur: same behavior */}
				<On event="Blur" target="name_input">
					<If
						condition={
							<NotEmpty>
								<FromElement id="name" type="String" />
							</NotEmpty>
						}
					>
						<SetValue selector="#name-error" value={<Constant value="" />} />
						<SetValue
							selector="#name-error"
							value={<Constant value="Required" />}
						/>
					</If>
				</On>

				{/* On submit: prevent navigation and validate once */}
				<On event="Submit" target="val-form">
					<If
						condition={
							<NotEmpty>
								<FromElement id="name" type="String" />
							</NotEmpty>
						}
					>
						<SetValue selector="#name-error" value={<Constant value="" />} />
						<SetValue
							selector="#name-error"
							value={<Constant value="Required" />}
						/>
					</If>
				</On>
			</Program>

			{/* Shared hydrator */}
			<script type="module" src="/scripts/hydrate/adaptive.js"></script>
		</body>
	)
}
