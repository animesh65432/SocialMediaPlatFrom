import { CronJob } from "cron";
import { Room } from "../Models";

const job = new CronJob("0 0 * * *", async () => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  try {
    await Room.destroy({ where: {} });
    console.log("All rooms have been deleted.");
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
});

export default job;
