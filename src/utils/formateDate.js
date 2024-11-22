const formateDate = (dateStr) => {
  const date = new Date(dateStr);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
};

export default formateDate;
