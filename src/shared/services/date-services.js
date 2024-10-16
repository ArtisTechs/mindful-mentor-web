export const formatDate = (dateString, format) => {
  const date = new Date(dateString);

  // Define available format options
  const formatOptions = {
    "YYYY-MM-DD": () => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    "Month Day, YYYY": new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date),
    "MM/DD/YYYY": new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date),
    // Add more formats as needed
  };

  // Check if the format exists
  if (!formatOptions[format]) {
    throw new Error("Invalid format specified");
  }

  // Use the appropriate format function or string
  return typeof formatOptions[format] === "function"
    ? formatOptions[format]()
    : formatOptions[format];
};
