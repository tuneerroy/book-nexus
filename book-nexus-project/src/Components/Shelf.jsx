import React, { useEffect, useState } from "react";
import BookRow from "./BookRow";
import AuthorRow from "./AuthorRow";
import ReviewRow from "./ReviewRow";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import LinearProgress from "@mui/material/LinearProgress";

function Shelf({ title, getItems, purpose = "books", pageSize = 7, params }) {
  if (!["books", "authors", "reviews"].includes(purpose))
    throw new Error("Invalid purpose");

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getItems({ ...params, pageSize, page })
      .then((data) =>
        setItems((oldData) => {
          if (!data || !data.length) {
            setPage(Math.max(1, page - 1));
            return oldData;
          }
          return data;
        })
      )
      .finally(() => setLoading(false));
  }, [params, getItems, page]);

  return (
    <div>
      <h2 className="text-2xl font-semibold my-5 ml-9">{title}</h2>
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="flex flex-row w-full min-h-[10vw]">
          {items && items.length ? (
            <>
              <BsChevronCompactLeft
                className="text-3xl my-auto cursor-pointer"
                onClick={() => page > 1 && setPage((page) => page - 1)}
              />
              {purpose === "books" ? (
                <BookRow books={items} />
              ) : (purpose === "authors" ? (
                <AuthorRow authors={items} />
              ) : <ReviewRow reviews={items} />)}
              <BsChevronCompactRight
                className="text-3xl my-auto cursor-pointer"
                onClick={() => setPage((page) => page + 1)}
              />
            </>
          ) : (
            <div className="pl-9">No items to display</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Shelf;
