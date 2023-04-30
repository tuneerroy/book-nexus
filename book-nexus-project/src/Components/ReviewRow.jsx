import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";

function ReviewRow({ reviews }) {
  return (
    <div className="flex flex-row w-full space-x-2 md:space-x-6 mt-12">
      {reviews &&
        reviews.map((review, i) => (
          <div key={i} className="flex flex-col">
            <Card>
              <CardHeader title={`Rating: ${review.rating} stars`} subheader={review.source} />
              <CardContent>
                <Typography variant="body1">{review.review}</Typography>
              </CardContent>
            </Card>
          </div>
        ))}
    </div>
  );
}

export default ReviewRow;
