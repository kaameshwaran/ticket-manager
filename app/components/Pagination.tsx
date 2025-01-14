'use client';
import { Button, Flex } from '@radix-ui/themes';
import React from 'react';
import {
  AiFillBackward,
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillForward,
} from 'react-icons/ai';

interface Props {
  totalItem: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ totalItem, pageSize, currentPage }: Props) => {
  const totalPage = Math.ceil(totalItem / pageSize);
  return (
    <>
      <Flex align={'center'} justify={'center'} gap={'2'}>
        <Button 
        color="gray" 
        variant="soft" 
        disabled={currentPage === 1}
        >
          <AiFillBackward />
        </Button>
        <Button
        color="gray" 
        variant="soft" 
        disabled={currentPage === 1}
        >
          <AiFillCaretLeft />
        </Button>
        <span>
          Page {currentPage} of {totalPage}
        </span>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === totalPage}
        >
          <AiFillCaretRight />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === totalPage}
        >
          <AiFillForward />
        </Button>
      </Flex>
    </>
  );
};

export default Pagination;
