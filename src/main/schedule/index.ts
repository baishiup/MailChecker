import { getMailHost } from './getMailHost';

export const runSchedule = async (
  aps: { username: string; password: string }[],
) => {
  aps.map(async (item) => {
    const hostInfo = await getMailHost(item.username);
    console.log(item.username, hostInfo);
  });
};
