# Copied from https://github.com/railwayapp/starters/blob/master/examples/deno/Dockerfile
FROM denoland/deno:1.16.2

WORKDIR /app

USER deno

# These steps will be re-run upon each file change in your working directory:
ADD . .

CMD deno run --allow-net --allow-read --allow-env --no-check index.ts
