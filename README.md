# ProxyChunk

ProxyChunk is a web-based open proxy checker and aggregator app.

## Installation
1. Install [proxyshiva](https://github.com/octoman90/proxyshiva) and make sure it is in your [PATH](https://en.wikipedia.org/wiki/PATH_(variable)).
2. Install PostgreSQL, then create a user and database for ProxyChunk to use.
3. Create a file with the name ".env" in the backend directory using this template:
```
# Self-explanatory
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=proxychunk

# A limit to how many proxies GET /api/proxies will return for each ?page
PROXIES_PER_PAGE=20

# Set to true to ignore IP addresses from reserved ranges
# https://en.wikipedia.org/wiki/Reserved_IP_addresses
SKIP_RESERVED=true

# Set to true to not check proxies' certificates
ANY_CERT=false

# After how many seconds a proxy is considered bad
TIMEOUT=5

# Port to which backend will listen to
PORT=4000
```
4. Execute this in *both* the backend and frontend directories:
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
