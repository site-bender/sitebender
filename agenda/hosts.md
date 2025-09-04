# Local hosts entries for Sitebender Docker services

Add these lines to your /etc/hosts to use pretty HTTPS hostnames via Caddy:

```
127.0.0.1 grafana.localhost prometheus.localhost thanos.localhost fuseki.localhost minio.localhost authentik.localhost
::1       grafana.localhost prometheus.localhost thanos.localhost fuseki.localhost minio.localhost authentik.localhost
```

Notes
- These map hostnames to your local machine so Caddy can terminate TLS for each service.
- Nothing else is required for Loki/Promtail because they’re backend-only and accessed via Grafana.
- Authentik runs at http://localhost:43200 (no TLS by default). We also proxy it via Caddy at https://authentik.localhost for convenience.
- If we add SSO in front of services via Caddy, the above hostnames remain the same.

TLS certs for authentik.localhost
- Generate local certs (mkcert) if not already present:
	- cert: `infra/local/configs/certs/authentik.localhost.pem`
	- key:  `infra/local/configs/certs/authentik.localhost-key.pem`
	See repo scripts/docs for mkcert usage.

Troubleshooting
- If https://prometheus.localhost doesn’t load, ensure Docker is running and the caddy service is up.
- If Grafana isn’t showing logs, confirm Loki and Promtail containers are running and Grafana datasource provisioning succeeded.

Restarting Docker or the stack
- Restart Docker Desktop (macOS): Menu bar whale icon → Troubleshoot → Restart; or Quit Docker Desktop and reopen.
- Restart just this stack: `docker compose restart`
- Restart Caddy only (after Caddyfile changes): `docker compose restart caddy`
- Full bounce: `docker compose down && docker compose up -d`
