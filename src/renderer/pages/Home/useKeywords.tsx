import { Input, Modal } from 'antd';
import { useState } from 'react';
import { antdModalV5, create, show, useModal } from '@ebay/nice-modal-react';

function AddModal() {
  const modal = useModal();
  const modalProps = antdModalV5(modal);

  const [keyword, setKeyword] = useState('');

  const handleOk = () => {
    modal.resolve(keyword);
    modalProps.onCancel();
  };

  return (
    <Modal {...modalProps} title="添加关键字" onOk={handleOk}>
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="输入关键字"
      />
    </Modal>
  );
}
const AddModalNice = create(AddModal);
const showAddModal = () => show(AddModalNice);

export const useKeywords = () => {
  const [keywords, setKeywords] = useState<string[]>([]);

  const addKeywordModal = async () => {
    const res = (await showAddModal()) as unknown as string;
    setKeywords((data) => [...data, res]);
  };

  const removeKeyword = (index: number) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };
  return { keywords, addKeywordModal, removeKeyword };
};
