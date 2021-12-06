import { getInput, setOutput, setFailed, warning } from "@actions/core";
import { getOctokit, context } from "@actions/github";

const states = ["open", "closed"];

async function run() {
  const octokit = getOctokit(getInput("token", { required: true }));
  const params = {};

  const title = getInput("title", { required: true });
  params["title"] = title;

  const state = getInput("state");
  if (!states.includes(state)) {
    throw new Error(
      `invalid value of "state": "${state}", expected "open" or "closed"`
    );
  }
  params["state"] = state;

  const description = getInput("description");
  if (description) {
    params["description"] = description;
  }

  const due_on = getInput("due_on");
  if (due_on) {
    if (isNaN(new Date(due_on).getTime())) {
      throw new Error(
        `invalid value of "due_on": "${due_on}", expected ISO 8601 format`
      );
    }
    params["due_on"] = due_on;
  }

  const ctx = context;
  const milestones = await octokit.rest.issues.listMilestones({
    owner: ctx.repo.owner,
    repo: ctx.repo.repo,
    state: "all",
  });
  const oldMilestone = milestones.data.find(
    (milestone) => milestone.title === title
  );

  if (oldMilestone) {
    setMilestoneOutput(oldMilestone);
    return;
  }

  params["owner"] = ctx.repo.owner;
  params["repo"] = ctx.repo.repo;
  const newMilestone = await octokit.rest.issues.createMilestone(params);

  setMilestoneOutput(newMilestone.data);
}

function setMilestoneOutput(milestone) {
  if (milestone.state === "closed") {
    warning(`The milestone "${milestone.title}" is closed.`);
  }
  setOutput("id", milestone.id);
  setOutput("number", milestone.number);
  setOutput("state", milestone.state);
  setOutput("description", milestone.description);
  setOutput("title", milestone.title);
  setOutput("due_on", milestone.due_on);
}

try {
  await run();
} catch (error) {
  setFailed(error.message);
}
