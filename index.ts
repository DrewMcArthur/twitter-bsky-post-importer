import { BskyAgent } from "@atproto/api";
import dotenv from "dotenv";

async function* loadTwitterArchive() {
  // TODO: given a zip file in this directory,
  // 1. unzip it to a folder (if it hasn't been already)
  // 2. return a generator that yields each post
  //    see https://dev.to/gsarciotto/generators-in-typescript-4b37 for more on generators
  yield {
    text: "hello from drew's twitter-bsky-post-importer",
    createdAt: new Date(),
  };
}

async function getAgent() {
  dotenv.config();
  const bskyUrl = process.env.BSKY_URL || "https://bsky.social";
  const bskyUsername = process.env.BSKY_USERNAME;
  const bskyPassword = process.env.BSKY_PASSWORD;

  if (bskyUsername === undefined || bskyPassword === undefined) {
    throw new Error(
      "BSKY_USERNAME and BSKY_PASSWORD must be set in your environment"
    );
  }

  const agent = new BskyAgent({
    service: bskyUrl,
  });

  const res = await agent.login({
    identifier: bskyUsername,
    password: bskyPassword,
  });

  if (!res.success) throw new Error("Failed to login");
  return agent;
}

function createPost(agent: BskyAgent, text: string, createdAt: Date) {
  return agent.post({
    text,
    createdAt: createdAt.toISOString(),
  });
}

async function copyTweets() {
  const archive = loadTwitterArchive();
  const agent = await getAgent();
  for await (const post of archive) {
    createPost(agent, post.text, post.createdAt);
  }
}

copyTweets();
