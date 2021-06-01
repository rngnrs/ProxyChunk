# ProxyChunk

ProxyChunk is a web-based open proxy checker and aggregator app.

## Installation

### Prerequisites

-   Node v14
-   Yarn (or NPM)

### Installation

1. Install [proxyshiva](https://github.com/octoman90/proxyshiva) and make sure it is in your [PATH](<https://en.wikipedia.org/wiki/PATH_(variable)>).
2. Install PostgreSQL, then create a user and a database for ProxyChunk to use.
3. In the backend directory, copy the `.env.template` file into `.env` and replace the configuration options with applicable.
4. Execute these commands in _both_ the backend and frontend directories:

```bash
yarn install
yarn build
```

5. Install Nginx or Apache or something similar and point it to serve files from the frontend/build directory, here's an example snippet for Nginx:

```
server {
	listen 80;
	server_name local;

	# Change this to where you have it
	root /path/to/where/you/have/ProxyChunk/frontend/build;

	location /api/ {
		# Change the port number to the one backend listens to
		# It's 4000 unless you specified something else in step 3
		proxy_pass http://127.0.0.1:4000/;
	}

	location / {
		index index.html;
		try_files $uri /index.html;
	}
}
```

## Running

1. Run PostgreSQL and Nginx.
2. Run this from the backend directory:

```bash
node ./dist/js/app.js
```

3. Visit http://localhost:80 and voilà.

## API

You can find OpenAPI documentation [here](https://gitlab.com/man90/proxychunk/-/blob/master/backend/doc/api/openapi.json).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
