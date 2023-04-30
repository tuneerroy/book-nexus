import React, { useEffect, useState } from "react";
import BookRow from "./BookRow";
import AuthorRow from "./AuthorRow";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import LinearProgress from "@mui/material/LinearProgress";

function Shelf({ title, getItems, purpose = "books", params }) {
  if (!["books", "authors"].includes(purpose))
    throw new Error("Invalid purpose");

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getItems({ ...params, pageSize: 7, page })
      .then((data) =>
        setItems((oldData) => {
          if (!data || !data.length) {
            setPage(page - 1);
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
              ) : (
                <AuthorRow authors={items} />
              )}
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
