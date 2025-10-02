import React from "react";
import "./DefaultLayout.css";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="container mx-auto bg-white rounded border-r-1 border-b-1 border-gray-100 p-6 mt-6">
      {children}
    </div>
  );
};

export default DefaultLayout;
