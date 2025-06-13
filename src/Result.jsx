import React from "react";

export default function Result({ score, total }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!!</h2>
      <p className="text-lg">
        your score {score} out of {total}
      </p>
    </div>
  );
}
