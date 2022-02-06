import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Pagination.scss";
import { Link } from "@mui/material";

// export default function BasicPagination({ count }) {
//   return (
//     <Stack spacing={Stack2}>
//       <Pagination count={count} color="primary" />
//     </Stack>
//   );
// }

export default function BasicPagination({
  peoplePerPage,
  totalPeople,
  paginate,
}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPeople / peoplePerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="pagination">
      {pageNumber.map((number) => (
        <li key={number} className="people__list">
          <span onClick={() => paginate(number)}>{number}</span>
        </li>
      ))}
    </div>
  );
}
