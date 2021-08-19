#!/bin/sh

cd ./backend

if test -f ".env"; then
	echo "Backend .env configuration already exists."
else
	echo "Creating backend .env configuration from a template."
	cp .env.template .env
	$EDITOR .env
fi

yarn install
yarn build

cd ../frontend

if test -f ".env"; then
	echo "Frontent .env configuration already exists."
else
	echo "Creating frontend .env configuration from a template."
	cp .env.template .env
	$EDITOR .env
fi

yarn install
yarn build
