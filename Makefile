lint-frontend:
	make -C frontend lint

install:
	npm ci && npm -C frontend ci

start-frontend:
	npm -C frontend start

start:
	node server.js

build:
	npm run build --prefix frontend
