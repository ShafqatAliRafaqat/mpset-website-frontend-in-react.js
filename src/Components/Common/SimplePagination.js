import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import React from "react";


const SimplePagination = (props) => {
  return (
    <Pagination className="mt-2">
      <PaginationItem>
        <PaginationLink previous tag="button" onClick={props.previous}>
          Prev
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next tag="button" onClick={props.next}>
          Next
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

export default SimplePagination;
