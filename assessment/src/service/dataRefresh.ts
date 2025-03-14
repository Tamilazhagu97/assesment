import { Queue } from "bullmq";
const refreshQueue = new Queue("dataRefresh");

export const triggerDataRefresh = async () => {
    await refreshQueue.add("refreshData", {});
    console.log("Data refresh job added to queue.");
};