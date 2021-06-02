# ProxyChunk

ProxyChunk is a web-based open proxy checker and aggregator app.

## Installation

### Prerequisites

-   Node >=v14.0
-   Yarn
-   PostgreSQL
-   Nginx

### Installation

1. Install [proxyshiva](https://github.com/octoman90/proxyshiva) and make sure it is in your [PATH](<https://en.wikipedia.org/wiki/PATH_(variable)>).
2. Create a user and a database in PostgreSQL for ProxyChunk to use.
3. Run `yarn build` command. Your system editor will be opened allowing you to change the configuration. You can change it later by editing the `backend/.env` file.
4. Point Nginx to serve files from the `frontend/build` directory using this snippet:

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
2. Run `yarn start` command.
3. Visit http://localhost:80 and voilà.

## API

You can find OpenAPI documentation [here](https://gitlab.com/man90/proxychunk/-/blob/master/backend/doc/api/openapi.json).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
