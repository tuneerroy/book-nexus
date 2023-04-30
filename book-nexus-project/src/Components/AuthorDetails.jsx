import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getAuthor, getBooks } from "../api";
import Shelf from "./Shelf";
import FavoritesButton from "./FavoritesButton";
import AuthorRecs from "./AuthorRecs";

function AuthorDetails() {
  const { id } = useParams();
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    getAuthor(id).then(setAuthorName);
  }, [id]);

  return (
    <div className="py-5 px-20">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="text-2xl pl-9 pb-10">
            Author: <span className="font-bold">{authorName}</span>
          </h1>
          <div>
            <AuthorRecs favoriteAuthors={[id]} title={"Similar authors"}/>
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <FavoritesButton purpose="authors" itemId={id} />
        </div>
      </div>
      <Shelf
        title={`Top books by ${authorName}`}
        getItems={getBooks}
        params={{ authors: [authorName] }}
      />
    </div>
  );
}

export default AuthorDetails;
