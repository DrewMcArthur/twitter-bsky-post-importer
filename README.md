# twitter-bsky-post-importer

A quick and dirty CLI tool to import all your tweets from a [twitter profile archive](https://help.twitter.com/en/managing-your-account/how-to-download-your-x-archive) onto bluesky.

To run, use your node package management system of choice.

1. First, place the zip archive into this folder.
2. `cp example.env .env`, and edit your username and password, as well as any other config
3. `[npm|yarn|bun] install` to install dependencies
4. `[npm|yarn|bun] start` to run the import script.

This project was created using `bun init` in bun v0.6.14. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
