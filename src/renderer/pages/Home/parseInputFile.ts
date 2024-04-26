export type ParseInputFileResType = Awaited<ReturnType<typeof parseInputFile>>;
export const parseInputFile = (
  file: File,
): Promise<{
  s: boolean;
  m: string;
  data: { username: string; password: string }[];
  errData: string[];
}> => {
  return new Promise((resolve) => {
    const validType = 'text/plain';
    if (file.type !== validType) {
      resolve({ s: false, m: '文件格式不支持', data: [], errData: [] });
    }

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = (event: any) => {
      const content = event.target.result;
      const res = handlertxtContent(content);
      if (!res.s) {
        resolve({ s: false, m: res.m, data: [], errData: [] });
      } else {
        resolve({
          s: true,
          m: '',
          data: res.successData,
          errData: res.errData,
        });
      }
    };
  });
};

const handlertxtContent = (txt: string) => {
  const errData: string[] = [];
  const successData: { username: string; password: string }[] = [];
  try {
    const arr = txt.split('\n');
    arr.map((item) => {
      try {
        const [username, password] = item.split(':');
        successData.push({ username, password });
      } catch (error) {
        errData.push(item);
      }
    });
  } catch (error) {
    return { s: false, m: '格式解析异常', successData, errData };
  }

  return { s: true, m: '', successData, errData };
};
