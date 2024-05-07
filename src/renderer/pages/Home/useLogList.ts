import { useState } from 'react';

export const useLogList = () => {
  const [logList, setLogList] = useState<string[]>([]);

  return [logList];
};
