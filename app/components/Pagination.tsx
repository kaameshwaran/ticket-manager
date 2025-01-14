'use client';
import { Button, Flex } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  const totalPage = Math.ceil(totalItem / pageSize);
  if (totalPage <= 1) return null;
  return (
    <>
      <Flex align={'center'} justify={'center'} gap={'2'}>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
          style={{ borderRadius: '8px', cursor: 'pointer' }}
        >
          <AiFillBackward />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          style={{ borderRadius: '8px', cursor: 'pointer' }}
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
          onClick={() => handlePageChange(currentPage + 1)}
          style={{ borderRadius: '8px', cursor: 'pointer' }}
        >
          <AiFillCaretRight />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === totalPage}
          onClick={() => handlePageChange(totalPage)}
          style={{ borderRadius: '8px', cursor: 'pointer' }}
        >
          <AiFillForward />
        </Button>
      </Flex>
    </>
  );
};

export default Pagination;
