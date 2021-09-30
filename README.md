# Local setup

## Docker container

Install npm

```bash

docker run -it --rm -v /your-app-path/:/app -w /app node:latest npm i

```

Start app

```bash

 docker run -p 8080:8080 -it --rm -v /your-app-path/:/app -w /app node:latest npm run start

```
