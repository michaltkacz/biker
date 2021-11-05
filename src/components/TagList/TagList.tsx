import React, { useEffect, useRef, useState } from 'react';
import { Input, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { v4 as uuidv4 } from 'uuid';

import './tagList.less';

export type TagListProps = {
  tags: Array<string> | null;
  onTagsChange: (newTags: Array<string> | null) => void;
};

const TagList: React.FC<TagListProps> = ({ tags, onTagsChange }) => {
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<Input | null>(null);

  useEffect(() => {
    inputVisible && inputRef.current?.focus();
  }, [inputVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    setInputVisible(false);

    if (!inputValue) {
      return;
    }

    if (!tags) {
      onTagsChange([inputValue]);
      setInputValue('');
      return;
    }

    if (tags.indexOf(inputValue) === -1) {
      onTagsChange([...tags, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className='tag-list'>
      {tags?.map((tag, index) => (
        <Tag
          color='processing'
          key={uuidv4()}
          closable
          onClose={() => {
            const newTags = [...tags];
            newTags.splice(index, 1);
            onTagsChange(newTags);
          }}
        >
          {tag}
        </Tag>
      ))}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type='text'
          size='small'
          className='tag-input'
          value={inputValue}
          style={{ maxWidth: 120 }}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag
          onClick={() => {
            setInputVisible(true);
          }}
        >
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </div>
  );
};

export default TagList;
