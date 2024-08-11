import { CronJob } from "cron";
import { Room } from "../Models";

const job = new CronJob("0 */5 * * *", async () => {
  try {
    await Room.destroy({ where: {} });
    console.log("All rooms have been deleted.");
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
});

export default job;
