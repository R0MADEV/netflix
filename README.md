# netflix

Full-stack app with Laravel (API) + Next.js (frontend) + MySQL, running via Docker and routed through [devproxy](https://github.com/romadesign/devproxy) with clean `.localhost` domains.

## Requirements

- Docker Desktop
- [devproxy](https://github.com/romadesign/devproxy) running — handles routing to `.localhost` domains

## Quick start

```bash
git clone <repo-url>
cd netflix
make setup
```

That's it. `make setup` will:
1. Start devproxy (Traefik)
2. Build and start all containers
3. Install Composer dependencies
4. Generate app key
5. Wait for MySQL to be ready
6. Run migrations and seeders

Once done, the app is available at:

| URL | Description |
|-----|-------------|
| `http://netflix.localhost:8090` | Laravel API |
| `http://netflix-front.localhost:8090` | Next.js frontend |
| `http://phpmyadmin.localhost:8090` | phpMyAdmin |

## Commands

### Containers

| Command | Description |
|---------|-------------|
| `make up` | Start containers |
| `make stop` | Stop containers |
| `make down` | Stop and remove containers |
| `make restart` | Restart containers |
| `make build` | Rebuild images (no cache) |
| `make ps` | List running containers |

### Database

| Command | Description |
|---------|-------------|
| `make migrate` | Run migrations |
| `make fresh` | Drop all tables, re-migrate and seed |
| `make seed` | Run seeders |
| `make rollback` | Rollback last migration |

### Logs

| Command | Description |
|---------|-------------|
| `make logs` | Follow all logs |
| `make log-app` | Follow PHP app logs |
| `make log-web` | Follow Nginx logs |
| `make log-front` | Follow frontend logs |
| `make log-db` | Follow database logs |

### Shells

| Command | Description |
|---------|-------------|
| `make app` | Shell into PHP container |
| `make web` | Shell into Nginx container |
| `make front` | Shell into frontend container |
| `make db` | Shell into MySQL container |
| `make sql` | Open MySQL CLI |

### Laravel

| Command | Description |
|---------|-------------|
| `make cache` | Run `php artisan optimize` |
| `make cache-clear` | Clear all caches |
| `make rate-clear` | Clear rate limiter cache |
| `make test` | Run PHPUnit tests |
| `make tinker` | Open Laravel Tinker |

### Frontend

| Command | Description |
|---------|-------------|
| `make npm-install` | Install npm dependencies |
| `make npm-dev` | Run dev server |
| `make npm-build` | Build for production |

## Stack

| Service | Image |
|---------|-------|
| PHP | php:8.2-fpm-bookworm |
| Nginx | nginx:1.24-alpine |
| MySQL | mysql:8.0 |
| Frontend | node:18-alpine |
| phpMyAdmin | phpmyadmin:latest |
