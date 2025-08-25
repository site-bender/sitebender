import createElement from "../../utilities/createElement/index.ts"

export default function ValidationDemo() {
	return (
		<body>
			<h1>Validation Demo</h1>
			<p>Type in the field; leaving it empty will show a required message.</p>
			<form id="val-form">
				<label for="name">Name</label>
				<input id="name" name="name" type="text" data-ir-id="name_input" />
				<span id="name-error" role="alert" aria-live="polite"></span>
				<div style="margin-top: 1rem">
					<button type="submit">Submit</button>
				</div>
			</form>
			{/* Adaptive IR for validation + hydration */}
			<script id="ir-root" type="application/adaptive+json">
				{JSON.stringify({
					v: "0.1.0",
					kind: "element",
					id: "root",
					tag: "div",
					attrs: {},
					children: [
						// On.Input: if not empty, clear error; else, show Required
						{
							v: "0.1.0",
							kind: "on",
							id: "name_input",
							event: "On.Input",
							handler: {
								v: "0.1.0",
								kind: "action",
								action: "Act.If",
								id: "if_input",
								args: [
									{
										v: "0.1.0",
										kind: "comparator",
										id: "c1",
										cmp: "Is.NotEmpty",
										args: [
											{
												v: "0.1.0",
												kind: "injector",
												id: "val",
												injector: "From.Element",
												args: { selector: "#name" },
											},
										],
									},
									{
										v: "0.1.0",
										kind: "action",
										id: "clear_err",
										action: "Act.SetValue",
										args: [
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "#name-error" },
											},
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "" },
											},
										],
									},
									{
										v: "0.1.0",
										kind: "action",
										id: "set_err",
										action: "Act.SetValue",
										args: [
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "#name-error" },
											},
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "Required" },
											},
										],
									},
								],
							},
						},
						// On.Blur: same behavior as input
						{
							v: "0.1.0",
							kind: "on",
							id: "name_input",
							event: "On.Blur",
							handler: {
								v: "0.1.0",
								kind: "action",
								action: "Act.If",
								id: "if_blur",
								args: [
									{
										v: "0.1.0",
										kind: "comparator",
										id: "c2",
										cmp: "Is.NotEmpty",
										args: [
											{
												v: "0.1.0",
												kind: "injector",
												id: "val2",
												injector: "From.Element",
												args: { selector: "#name" },
											},
										],
									},
									{
										v: "0.1.0",
										kind: "action",
										id: "clear_err2",
										action: "Act.SetValue",
										args: [
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "#name-error" },
											},
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "" },
											},
										],
									},
									{
										v: "0.1.0",
										kind: "action",
										id: "set_err2",
										action: "Act.SetValue",
										args: [
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "#name-error" },
											},
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "Required" },
											},
										],
									},
								],
							},
						},
						// On.Submit: prevent navigation, then validate once
						{
							v: "0.1.0",
							kind: "on",
							id: "val-form",
							event: "On.Submit",
							handler: {
								v: "0.1.0",
								kind: "action",
								action: "Act.If",
								id: "if_submit",
								args: [
									{
										v: "0.1.0",
										kind: "comparator",
										id: "c3",
										cmp: "Is.NotEmpty",
										args: [
											{
												v: "0.1.0",
												kind: "injector",
												id: "val3",
												injector: "From.Element",
												args: { selector: "#name" },
											},
										],
									},
									{
										v: "0.1.0",
										kind: "action",
										id: "clear_err3",
										action: "Act.SetValue",
										args: [
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "#name-error" },
											},
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "" },
											},
										],
									},
									{
										v: "0.1.0",
										kind: "action",
										id: "set_err3",
										action: "Act.SetValue",
										args: [
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "#name-error" },
											},
											{
												v: "0.1.0",
												kind: "injector",
												injector: "From.Constant",
												args: { value: "Required" },
											},
										],
									},
								],
							},
						},
					],
				})}
			</script>
			<script>
				{`
        (() => {
          const docEl = document.getElementById('ir-root');
          if (!docEl) return;
          const ir = JSON.parse(docEl.textContent || '{}');
          // Minimal inline hydrator for docs
          const qByData = (id) => document.querySelector('[data-ir-id="' + id + '"]');
          const qById = (id) => document.getElementById(id);
          const resolveAnchor = (id) => qByData(id) || qById(id);
          const toString = (v) => typeof v === 'string' ? v : (v == null ? '' : String(v));
          const injectors = {
            'From.Constant': (node) => node.args?.value,
            'From.Element': (node) => {
              const sel = toString(node.args?.selector || '');
              const el = sel ? document.querySelector(sel) : null;
              if (!el) return undefined;
              return 'value' in el ? el.value : (el.textContent || '');
            }
          };
          const comparators = {
            'Is.NotEmpty': async (node, evalArg) => {
              const v = await (node.args?.[0] ? evalArg(node.args[0]) : '');
              return toString(v).trim().length > 0;
            }
          };
          const actions = {
            'Act.SetValue': async (node, evalArg) => {
              const sel = toString(node.args?.[0] ? await evalArg(node.args[0]) : '');
              const val = toString(node.args?.[1] ? await evalArg(node.args[1]) : '');
              const el = sel ? document.querySelector(sel) : null;
              if (!el) return;
              if ('value' in el) el.value = val; else el.textContent = val;
            },
            'Act.If': async (node, evalArg) => {
              const [condNode, thenNode, elseNode] = node.args || [];
              const cond = condNode ? await evaluate(condNode) : false;
              const run = async (n) => { if (!n || n.kind !== 'action') return; await actions[n.action]?.(n, evalArg); };
              if (cond) await run(thenNode); else await run(elseNode);
            }
          };
          const evaluate = async (node) => {
            if (!node) return undefined;
            if (node.kind === 'injector') return injectors[node.injector]?.(node);
            if (node.kind === 'operator') return undefined; // not used here
            if (node.kind === 'comparator') {
              const fn = comparators[node.cmp];
              const evalArg = (n) => evaluate(n);
              return fn ? await fn(node, evalArg) : undefined;
            }
            return undefined;
          };
          const binders = {
            'On.Input': (el, handler) => el.addEventListener('input', () => { Promise.resolve(handler()).catch(console.error); }),
            'On.Blur': (el, handler) => el.addEventListener('blur', () => { Promise.resolve(handler()).catch(console.error); }),
            'On.Submit': (el, handler) => el.addEventListener('submit', (e) => { e.preventDefault(); Promise.resolve(handler()).catch(console.error); })
          };
          const dispatchAction = async (actionNode) => {
            const evalArg = (n) => evaluate(n);
            const exec = actions[actionNode.action];
            if (exec) await exec(actionNode, evalArg);
          };
          const bindEvent = (evtNode) => {
            const el = resolveAnchor(evtNode.id);
            const binder = el ? binders[evtNode.event] : undefined;
            if (el && binder && evtNode.handler) binder(el, () => dispatchAction(evtNode.handler));
          };
          const walk = (node, fn) => {
            fn(node);
            if (node && Array.isArray(node.children)) node.children.forEach((c) => walk(c, fn));
            if (node && Array.isArray(node.args)) node.args.forEach((a) => walk(a, fn));
          };
          walk(ir, (n) => { if (n.kind === 'on') bindEvent(n); });
        })();
      `}
			</script>
		</body>
	)
}
