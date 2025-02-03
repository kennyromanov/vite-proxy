# Vite proxy

## Dependency

### Install dependency:

```bash
bun i hmr-proxy
```

### Configure the proxy:

```bash
vim .vpconfig.json
```

```json
{
  "routes": {
    "/app1": "http://localhost:8001'",
    "/app2": "http://localhost:8002"
  },
  "port": 5000
}
```

### Run the proxy:

```bash
vite-proxy
```

---

## Project

### Install dependencies:

```bash
bun i
```

### Set up the schema:

```bash
cp .vpconfig.example.json .vpconfig.json
```

```bash
vim .vpconfig.json
```

### Run the proxy:

```bash
bun run start
```
