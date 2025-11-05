# OpenMetadata Integration for Sitebender

This directory contains the Docker Compose configuration for running OpenMetadata data catalog alongside the Sitebender Studio infrastructure.

## What is OpenMetadata?

**OpenMetadata** is the #1 open-source data catalog and governance platform, built by the founders of Apache Hadoop, Apache Atlas, and Uber Databook. With 2,000+ enterprise deployments, 7,100+ GitHub stars, and 340+ contributors, it provides:

- **Discovery** - Search and preview across data estates with 100+ connectors
- **Lineage** - Track data flow and dependencies across systems
- **Observability** - Monitor data health and quality metrics
- **Quality** - Implement data quality frameworks and tests
- **Collaboration** - Conversations, tasks, and knowledge sharing
- **Governance** - Enforce policies, standards, and compliance

## Why OpenMetadata + Sitebender?

This integration implements **Phase 5** of the [ISO/IEC 11179 Metadata Registry Alignment](../../libraries/pathfinder/ISO_IEC_11179_ALIGNMENT.md) strategy:

### Hybrid Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Sitebender Application Layer                                │
│ - JSX components define data elements                        │
└─────────────────┬───────────────────────────────────────────┘
                  ↓ (metadata extraction via Artificer)
┌─────────────────────────────────────────────────────────────┐
│ Pathfinder: ISO/IEC 11179 Metadata Registry                 │
│ - Standards-based registry core (RDF/SPARQL)                │
│ - Source of truth for Sitebender metadata                   │
└─────────────────┬───────────────────────────────────────────┘
                  ↓ (optional integration - Phase 5)
┌─────────────────────────────────────────────────────────────┐
│ OpenMetadata Platform (Optional Enterprise Integration)     │
│ - Enterprise data catalog                                    │
│ - Rich discovery UI, lineage visualization                   │
└─────────────────────────────────────────────────────────────┘
```

**Key principles**:
- **Sitebender works standalone** with Pathfinder (no OpenMetadata required)
- **Standards-based foundation** - ISO/IEC 11179 ensures no platform lock-in
- **Enterprise appeal** - "Works with OpenMetadata" unlocks large-scale data governance
- **Phased adoption** - Start simple, add OpenMetadata when needed

## Architecture

This deployment includes **4 services**:

1. **openmetadata_server** (Port 8585) - Main application server
2. **openmetadata_ingestion** (Port 8080) - Airflow for metadata ingestion pipelines
3. **openmetadata_elasticsearch** (Ports 9200, 9300) - Search index
4. **openmetadata_postgresql** (Port 45432) - Metadata storage

### Integration with Sitebender Infrastructure

- **Network**: Uses external `monitoring` network from main `docker-compose.yml`
- **Reverse Proxy**: Caddy routes `openmetadata.localhost` → server, `airflow.localhost` → ingestion
- **TLS**: mkcert certificates for local HTTPS
- **Isolation**: Separate compose file, can run/stop independently

## Access URLs

### Via Caddy (Recommended)
- **OpenMetadata UI**: https://openmetadata.localhost
- **Airflow UI**: https://airflow.localhost

### Direct (Optional)
- **OpenMetadata UI**: http://localhost:8585
- **Airflow UI**: http://localhost:8080
- **Elasticsearch**: http://localhost:9200
- **PostgreSQL**: `localhost:45432`

## Default Credentials

### OpenMetadata
- **Email**: admin@open-metadata.org
- **Password**: admin

### Airflow
- **Username**: admin
- **Password**: admin

### PostgreSQL
- **User**: postgres
- **Password**: password
- **Database**: openmetadata_db

## Quick Start

### Prerequisites

1. **Docker Desktop** configured with:
   - **Memory**: At least 6GB (10GB+ recommended)
   - **CPUs**: 4+ cores
   - Docker Compose v2.1.1+

2. **Main infrastructure running**:
   ```bash
   cd /Users/guy/Workspace/@sitebender/sitebender/infrastructure
   docker compose up -d  # Start main stack (creates 'monitoring' network)
   ```

3. **mkcert certificates** (already generated in `ops/certs/`):
   - `openmetadata.localhost.pem` + key
   - `airflow.localhost.pem` + key

### Start OpenMetadata

```bash
cd /Users/guy/Workspace/@sitebender/sitebender/infrastructure/openmetadata
docker compose up -d
```

**First startup takes 3-5 minutes**:
1. PostgreSQL starts and initializes databases
2. Elasticsearch starts and creates indexes
3. `execute-migrate-all` runs database migrations
4. OpenMetadata server starts
5. Airflow ingestion starts

### Check Status

```bash
# View all containers
docker compose ps

# Should see 4 containers with status "Up" or "Up (healthy)"
# - openmetadata_postgresql       (healthy)
# - openmetadata_elasticsearch    (healthy)
# - openmetadata_server           (healthy)
# - openmetadata_ingestion        (Up)

# View logs
docker compose logs -f openmetadata_server

# Wait for: "Started OpenMetadataApplication in X seconds"
```

### Access OpenMetadata

1. Open browser: https://openmetadata.localhost
2. Login with `admin@open-metadata.org` / `admin`
3. You should see the OpenMetadata dashboard

### Access Airflow

1. Open browser: https://airflow.localhost
2. Login with `admin` / `admin`
3. You should see the Airflow DAGs interface

## Usage

### Stop OpenMetadata

```bash
cd /Users/guy/Workspace/@sitebender/sitebender/infrastructure/openmetadata
docker compose stop
```

Data persists in Docker volumes. Restart with `docker compose start`.

### Restart OpenMetadata

```bash
docker compose restart
```

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f openmetadata_server
docker compose logs -f openmetadata_ingestion
docker compose logs -f openmetadata_elasticsearch
```

### Complete Cleanup (Deletes All Data)

```bash
# Stop and remove containers + volumes
docker compose down -v

# This deletes:
# - All metadata in PostgreSQL
# - All search indexes in Elasticsearch
# - All Airflow DAGs and logs
```

## Resource Usage

### Memory
- **Elasticsearch**: ~2GB (configured with `-Xms1024m -Xmx1024m`, can use more)
- **OpenMetadata Server**: ~1GB (configured with `-Xmx1G -Xms1G`)
- **Airflow**: ~1GB
- **PostgreSQL**: ~200MB
- **Total**: ~4GB additional to main infrastructure

### Disk
- **Volumes**: ~2GB for data persistence
  - `es-data` - Elasticsearch indexes
  - `pg-data` - PostgreSQL databases
  - `ingestion-volume-*` - Airflow DAGs and temp files

### Ports
- **8585** - OpenMetadata UI
- **8586** - OpenMetadata admin/healthcheck
- **8080** - Airflow UI
- **9200** - Elasticsearch HTTP API
- **9300** - Elasticsearch inter-node communication
- **45432** - PostgreSQL (changed from default 5432 to avoid conflicts)

## Integration Scenarios

### Scenario 1: Standalone Exploration (Current Setup)

**What it does**: Run OpenMetadata to explore data catalog capabilities, connect to databases, visualize lineage.

**Use case**: Learning, prototyping, understanding OpenMetadata features.

**Setup**: Already done! Just start containers and explore the UI.

### Scenario 2: Export Sitebender Metadata to OpenMetadata

**What it does**: Push Pathfinder (ISO/IEC 11179) metadata from Sitebender forms into OpenMetadata as "Custom Properties" or "Data Assets."

**Use case**: Make Sitebender form fields discoverable in enterprise data catalog.

**Implementation** (Future - Phase 5 Task 5.2):
```typescript
import { exportToOpenMetadata } from "@sitebender/pathfinder/openmetadata/export/index.ts"

const result = await exportToOpenMetadata({
  pathfinderStore: localTripleStore,
  openmetadataUrl: "https://openmetadata.localhost",
  apiKey: process.env.OPENMETADATA_API_KEY,
  mode: "incremental"
})(config)
```

### Scenario 3: Import Schemas from OpenMetadata

**What it does**: Import database schemas, API specs, or data models from OpenMetadata and auto-generate Sitebender form components.

**Use case**: Build Sitebender forms from existing database tables discovered in OpenMetadata.

**Implementation** (Future - Phase 5 Task 5.4):
```typescript
const jsxCode = await generateComponentsFromSchema({
  dataElements: importedElements,
  formName: "UserRegistrationForm"
})(pathfinderStore)
```

### Scenario 4: SPARQL Federation with Pathfinder

**What it does**: Query both Pathfinder (Fuseki) and OpenMetadata metadata in unified SPARQL queries.

**Use case**: Cross-system metadata analysis, impact analysis, lineage across Sitebender + enterprise data.

**Implementation** (Future - Phase 5 Task 5.6):
```sparql
PREFIX om: <http://open-metadata.org/schema/>
PREFIX iso: <http://purl.org/iso11179/registry/>

SELECT ?formField ?dbColumn ?lineage
FROM <pathfinder:registry>
FROM <openmetadata:catalog>
WHERE {
  ?formField a iso:DataElement ;
             iso:hasDomain ?domain .
  ?dbColumn a om:Column ;
            om:mapsTo ?domain ;
            om:hasLineage ?lineage .
}
```

## Troubleshooting

### Containers not starting

**Check Docker memory allocation**:
```bash
docker info | grep -i memory
# Should show at least 6GB available
```

Increase in Docker Desktop: Preferences → Resources → Advanced → Memory (set to 10GB+)

### Elasticsearch fails healthcheck

**Symptoms**: `openmetadata_elasticsearch` shows "unhealthy" status.

**Fix**: Elasticsearch needs time to initialize. Wait 2-3 minutes. If still failing:
```bash
docker compose logs openmetadata_elasticsearch

# Look for errors about memory, file descriptors, or vm.max_map_count
```

**On Linux**: May need to increase `vm.max_map_count`:
```bash
sudo sysctl -w vm.max_map_count=262144
```

### OpenMetadata server won't start

**Check migration service completed**:
```bash
docker compose ps execute_migrate_all
# Should show "Exited (0)" status

docker compose logs execute_migrate_all
# Should end with "Migration completed successfully"
```

If migrations failed, cleanup and restart:
```bash
docker compose down -v
docker compose up -d
```

### Port conflicts

**Error**: `Bind for 0.0.0.0:8585 failed: port is already allocated`

**Fix**: Another service is using the port. Either:
1. Stop the conflicting service
2. Change OpenMetadata port in `docker-compose.yml`:
   ```yaml
   ports:
     - "18585:8585"  # Use port 18585 instead
   ```

### Can't access https://openmetadata.localhost

**Check Caddy routing**:
```bash
cd /Users/guy/Workspace/@sitebender/sitebender/infrastructure
docker compose logs caddy | grep openmetadata
```

**Verify network connectivity**:
```bash
docker network inspect monitoring | grep openmetadata_server
# Should show openmetadata_server in the network
```

**Test direct access**: http://localhost:8585 (should work even if Caddy routing fails)

### Airflow login fails

**Default credentials changed?** Check environment variables in `docker-compose.yml`:
```yaml
AIRFLOW_USERNAME: ${AIRFLOW_USERNAME:-admin}
AIRFLOW_PASSWORD: ${AIRFLOW_PASSWORD:-admin}
```

**Reset Airflow database**:
```bash
docker compose down openmetadata_ingestion
docker volume rm openmetadata_ingestion-volume-dag-airflow
docker compose up -d openmetadata_ingestion
```

## Configuration

### Environment Variables

All configuration uses environment variables with sensible defaults. To override:

1. Create `.env` file in `infrastructure/openmetadata/`:
   ```bash
   # OpenMetadata
   AUTHENTICATION_PROVIDER=basic
   LOG_LEVEL=INFO

   # Airflow
   AIRFLOW_USERNAME=myadmin
   AIRFLOW_PASSWORD=mypassword

   # PostgreSQL
   POSTGRES_PASSWORD=secure_password
   ```

2. Restart:
   ```bash
   docker compose down
   docker compose up -d
   ```

### Key Configuration Options

See `docker-compose.yml` for full list. Notable options:

- **Authentication**: `AUTHENTICATION_PROVIDER` (basic, google, okta, auth0, etc.)
- **OIDC/SSO**: `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`, `OIDC_DISCOVERY_URI`
- **Elasticsearch**: `ELASTICSEARCH_HOST`, `ELASTICSEARCH_PORT`
- **Memory**: `OPENMETADATA_HEAP_OPTS`, `ES_JAVA_OPTS`

## Next Steps

### Phase 5 Implementation (Future)

Once you're comfortable with OpenMetadata, implement Phase 5 tasks from the [ISO/IEC 11179 alignment doc](../../libraries/pathfinder/ISO_IEC_11179_ALIGNMENT.md):

1. **Task 5.1**: Study OpenMetadata API and data model
2. **Task 5.2**: Implement metadata export (Pathfinder → OpenMetadata)
3. **Task 5.3**: Implement metadata import (OpenMetadata → Pathfinder)
4. **Task 5.4**: Auto-generate Sitebender components from imported schemas
5. **Task 5.5**: Bi-directional synchronization
6. **Task 5.6**: SPARQL federation queries
7. **Task 5.7**: Create comprehensive integration documentation

### Authentik SSO Integration (Optional)

To integrate with your existing Authentik IdP:

1. Create OAuth2 application in Authentik for OpenMetadata
2. Add `oauth2-proxy-openmetadata` service to main `docker-compose.yml`
3. Configure OpenMetadata OIDC settings in `.env`

See existing `oauth2-proxy-grafana` service as reference.

## Resources

### OpenMetadata Documentation
- **Official Docs**: https://docs.open-metadata.org/
- **API Reference**: https://docs.open-metadata.org/latest/main-concepts/metadata-standard/apis
- **GitHub**: https://github.com/open-metadata/OpenMetadata
- **Slack Community**: https://slack.open-metadata.org

### Sitebender Documentation
- **ISO/IEC 11179 Alignment**: `../../libraries/pathfinder/ISO_IEC_11179_ALIGNMENT.md`
- **Pathfinder Library**: `../../libraries/pathfinder/`
- **Artificer (Metadata Extraction)**: `../../libraries/artificer/`

## License

OpenMetadata is licensed under Apache License 2.0.

This integration and documentation are part of Sitebender Studio.
