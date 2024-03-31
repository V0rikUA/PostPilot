const __getTimeStampFirstLastDay = (date, currentOrLast) => {
  const firstDayOfMonth = currentOrLast
    ? new Date(date.getFullYear(), date.getMonth(), 1)
    : new Date(date.getFullYear(), date.getMonth() - 1, 1);
  let firstDayOfMonthTimestamp = Date.parse(firstDayOfMonth.toISOString());

  return Math.round(firstDayOfMonthTimestamp / 1000);
};

const getTimeStamps = (period) => {
  const date = new Date();
  const dateNow = Math.round(Date.now() / 1000);

  const periodInSeconds = {
    days_30: 2592000,
    day: 86400,
    this_month: dateNow - __getTimeStampFirstLastDay(date, true),
  };

  if (periodInSeconds.this_month > periodInSeconds.days_30)
    periodInSeconds.this_month = periodInSeconds.days_30;

  const fromDate = dateNow - periodInSeconds[period];

  return { until: dateNow, since: fromDate };
};

const getPreviousMonthTimeStamps = () => {
  const date = new Date();
  const dateNow = Math.round(Date.now() / 1000);

  const until = __getTimeStampFirstLastDay(date, true);
  const since = __getTimeStampFirstLastDay(date, false);

  return { since, until };
};

const getTimeStampsArrayForMonth = (period) => {
  //for now it can be accepted only 2 days period, because I dont want to spam facebook api with around 20 requests.
  //Later i will be saving data to DB and reduce it.
  const timeSplitter = {
    "2days": 172800,
  };

  const date = new Date();
  const dateNow = Math.round(Date.now() / 1000);

  const firstDay = __getTimeStampFirstLastDay(date, true);

  const loopIterations = Math.floor(
    (dateNow - firstDay) / timeSplitter[period]
  );

  const timeStampsArray = [];
  let prevDate = firstDay;

  for (let i = 0; i < loopIterations; i++) {
    if (i === loopIterations - 1) {
      timeStampsArray.push({ since: prevDate, until: dateNow });
    } else {
      const until = prevDate + timeSplitter[period];
      timeStampsArray.push({ since: prevDate, until });
      prevDate = until;
    }
  }

  return timeStampsArray;
};

module.exports = {
  getTimeStamps,
  getPreviousMonthTimeStamps,
  getTimeStampsArrayForMonth,
};
