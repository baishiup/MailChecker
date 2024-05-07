import { Card, Col, List, Row, Flex, Button, Space, message } from 'antd';
import { useRef, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useDrop } from 'ahooks';
import styles from './styles.less';
import { useKeywords } from './useKeywords';
import { ParseInputFileResType, parseInputFile } from './parseInputFile';
import { Log } from './Log';
/**
 * 功能点
 *
 * 设置
 * 1 控制流程
 *  1 检查登录
 *  2 扫描关键字
 *  3 linkedin换绑
 *
 * 操作
 * 分步操作
 *
 * 1 拖动账密文件进来，处理成数组
 * 2 连接每个邮箱
 * 3 判断邮箱结果
 *  1 是否能登录
 *  2 是否包含关键字
 * 4 输出结果
 * 5 执行换绑（丢到换绑操作池去执行）
 *
 *
 * 显示区
 * 1 导入的数据 总数
 * 2 连接、登录成功数
 * 3 包含关键字数
 * 4 换绑成功数
 *
 *
 *
 *
 *
 */

export function Home() {
  const { keywords, addKeywordModal, removeKeyword } = useKeywords();

  const dropRef = useRef(null);
  useDrop(dropRef, {
    onFiles: async (files) => {
      const data = await parseInputFile(files[0]);
      if (!data.s) {
        message.error(data.m);
      } else {
        init(data);
      }
    },
  });

  const [flowstatus, setFlowstatus] = useState<'init' | 'load' | 'end'>('init');

  const [alldata, setAlldata] = useState<ParseInputFileResType['data']>([]);
  const [gooddata, setGooddata] = useState<ParseInputFileResType['data']>([]);
  const [founddata, setFounddata] = useState<ParseInputFileResType['data']>([]);

  const init = (data: ParseInputFileResType) => {
    setAlldata(data.data);
    setGooddata([]);
    setFounddata([]);

    setFlowstatus('load');
  };

  const start = () => {
    if (!alldata.length) {
      return message.info('没有导入数据');
    }

    window.electron.ipcRenderer.runSchedule(alldata);

    console.log('start');
    setFlowstatus('load');
  };

  const stop = () => {
    window.electron.ipcRenderer.stopSchedule();
  };

  const clear = () => {};

  return (
    <div className={styles.page} ref={dropRef}>
      <Row gutter={16} style={{ height: '100%' }}>
        <Col flex={1}>
          <Flex vertical style={{ height: '100%' }}>
            <Card>
              <Flex
                style={{ height: 40 }}
                align="center"
                justify="space-between"
              >
                <h2 style={{ margin: 0 }}>已导入数据: {alldata.length}</h2>
                <Flex>
                  <Button type="primary" onClick={start}>
                    开始
                  </Button>
                  <Button style={{ marginLeft: 10 }} danger onClick={stop}>
                    停止
                  </Button>
                  <Button style={{ marginLeft: 10 }} onClick={clear}>
                    清空
                  </Button>
                </Flex>
              </Flex>
            </Card>
            <Card style={{ flex: 1, margin: '16px 0' }}>
              <Log />
            </Card>
            <Card style={{ height: 400 }}>1</Card>
          </Flex>
        </Col>

        <Col span={6}>
          <Card bordered={false} style={{ height: '100%' }}>
            <List
              size="small"
              header={
                <Flex
                  style={{ width: '100%' }}
                  align="center"
                  justify="space-between"
                >
                  <span>关键字</span>
                  <Button type="link" onClick={addKeywordModal}>
                    +添加
                  </Button>
                </Flex>
              }
              bordered
              dataSource={keywords}
              renderItem={(item, index) => (
                <List.Item>
                  <Flex
                    style={{ width: '100%' }}
                    align="center"
                    justify="space-between"
                  >
                    <span>{item}</span>
                    <Button
                      onClick={() => removeKeyword(index)}
                      type="link"
                      icon={<CloseOutlined />}
                    />
                  </Flex>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
