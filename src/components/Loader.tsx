import React from "react";

export const Loader: React.FC = () => (
  <div className="flex items-center justify-center p-2">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2"></div>
  </div>
);