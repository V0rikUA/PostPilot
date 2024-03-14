const timestampToDateWords = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = { month: "short", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};

export default timestampToDateWords;
