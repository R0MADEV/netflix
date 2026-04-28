# ==========================================
# TRAEFIK
# ==========================================
traefik-up:
	docker compose -f ../devproxy/docker/docker-compose.yml up -d
traefik-down:
	docker compose -f ../devproxy/docker/docker-compose.yml stop

# ==========================================
# SETUP — primera vez
# ==========================================
setup:
	@make traefik-up
	docker compose up -d --build
	docker compose exec app composer install
	@if [ ! -f backend/.env ]; then cp backend/.env.example backend/.env; fi
	docker compose exec app php artisan key:generate
	docker compose exec app php artisan storage:link
	docker compose exec app chmod -R 777 storage bootstrap/cache
	@echo "Esperando a que MySQL esté listo..."
	@until docker compose exec db mysql -uphper -psecret -e "SELECT 1" > /dev/null 2>&1; do sleep 2; done
	@echo "MySQL listo."
	@make fresh
	@echo ""
	@echo "Proyecto listo en:"
	@echo "  http://netflix.localhost:8090"
	@echo "  http://netflix-front.localhost:8090"
	@echo "  http://phpmyadmin.localhost:8090"

# ==========================================
# CONTENEDORES
# ==========================================
up:
	docker compose up -d
build:
	docker compose build --no-cache
stop:
	docker compose stop
down:
	docker compose down --remove-orphans
restart:
	@make down
	@make up
destroy:
	docker compose down --rmi all --volumes --remove-orphans
ps:
	docker compose ps

# ==========================================
# LOGS
# ==========================================
logs:
	docker compose logs --follow
log-app:
	docker compose logs --follow app
log-web:
	docker compose logs --follow web
log-front:
	docker compose logs --follow frontend
log-db:
	docker compose logs --follow db

# ==========================================
# SHELLS
# ==========================================
app:
	docker compose exec app bash
web:
	docker compose exec web ash
front:
	docker compose exec frontend sh
db:
	docker compose exec db bash
sql:
	docker compose exec db bash -c 'mysql -u $$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'

# ==========================================
# BASE DE DATOS
# ==========================================
migrate:
	docker compose exec app php artisan migrate
fresh:
	docker compose exec app php artisan migrate:fresh --seed
seed:
	docker compose exec app php artisan db:seed
rollback:
	docker compose exec app php artisan migrate:rollback
tinker:
	docker compose exec app php artisan tinker

# ==========================================
# LARAVEL
# ==========================================
cache:
	docker compose exec app php artisan optimize
cache-clear:
	docker compose exec app php artisan optimize:clear
test:
	docker compose exec app php artisan test
rate-clear:
	docker compose exec app php artisan cache:clear

# ==========================================
# FRONTEND
# ==========================================
npm-install:
	docker compose exec frontend npm install
npm-dev:
	docker compose exec frontend npm run dev
npm-build:
	docker compose exec frontend npm run build
