import React from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({
  current,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const from = totalItems === 0 ? 0 : (current - 1) * itemsPerPage + 1;
  const to = Math.min(current * itemsPerPage, totalItems);

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === current}
        onClick={() => onPageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 border-top pt-3 px-2">
      <div className="text-muted small mb-3 mb-md-0">
        Showing <b>{from}</b> to <b>{to}</b> of <b>{totalItems}</b> entries
        <span className="ms-2 border-start ps-2 text-primary fw-bold">
          Page {current} of {totalPages}
        </span>
      </div>

      <Pagination className="mb-0 shadow-sm">
        <Pagination.Prev
          disabled={current === 1}
          onClick={() => onPageChange(current - 1)}
        />
        {items}
        <Pagination.Next
          disabled={current === totalPages}
          onClick={() => onPageChange(current + 1)}
        />
      </Pagination>
    </div>
  );
};

export default CustomPagination;
