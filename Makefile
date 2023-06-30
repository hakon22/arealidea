lint-frontend:
	make -C frontend lint

install:
	npm i && npm -C frontend i

start-frontend:
	npm -C frontend start

start-backend:
	npx start-server -s ./frontend/build

build:
	npm run build --prefix frontend
