import { useLogList } from './useLogList';

export function Log() {
  const [logList] = useLogList();
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      {logList.map((x, i) => (
        <div key={i}>{x}</div>
      ))}
    </div>
  );
}
