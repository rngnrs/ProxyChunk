#!/bin/sh

cd ./backend

if test -f ".env"; then
	echo ".env configuration already exists."
else
	echo "Creating .env configuration from a template."
	cp .env.template .env
	$EDITOR .env
fi

yarn install
yarn build

cd ../frontend

yarn install
yarn build
