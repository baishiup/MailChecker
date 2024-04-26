import axios from 'axios';

export const getMailHost = async (email: string) => {
  try {
    const res = await axios.get(
      `https://emailsettings.firetrust.com/settings?q=${email}`,
    );

    const settings = res.data.settings as {
      protocol: 'SMTP' | 'POP3' | 'IMAP';
      address: string;
      port: number;
      secure: string;
      username: string;
    }[];

    return settings.reduce(
      (a, item) => {
        a[item.protocol] = item;
        return a;
      },
      {} as Record<
        (typeof settings)[number]['protocol'],
        (typeof settings)[number]
      >,
    );
  } catch (error) {
    return false;
  }
};
