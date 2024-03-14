import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import timestampToDateWords from "../utils/timestampToDateWords";

const initialState = {
  this_month: {},
  days_30: {},
  day: {},
  prevMonth: {},
  detailed: {},
  followUnfollow: {},
};

export const getInsigts = createAsyncThunk(
  "charts/periodInsights",
  async (period) => {
    const insites = await api
      .getUserInsigts(period)
      .then((data) => data)
      .catch((error) => {
        return Promise.reject(`Cannot get insite for period=>${period}`);
      });
    return { insites, period };
  }
);

export const getDetailedInsigts = createAsyncThunk(
  "charts/detailedInsights",
  async (period) => {
    const insites = await api
      .getUserInsigtsDetailed(period)
      .then((data) => {
        return data;
      })
      .catch(() => Promise.reject(`Cannot get detailed insites.`));
    return { insites };
  }
);

export const getBaseInsights = createAsyncThunk(
  "charts/baseinsights",
  async () => {
    const period = {
      this_month: "this_month",
      prevMonth: "prevMonth",
      detailed: "2days",
    };
    try {
      const prevMonth = await api
        .getUserInsigts(period.prevMonth)
        .then((data) => {
          return data;
        })
        .catch(() => Promise.reject(`Cannot get prevMonth insites.`));

      const thisMonth = await api
        .getUserInsigts(period.this_month)
        .then((data) => {
          return data;
        })
        .catch(() => Promise.reject(`Cannot get thisMonth insites.`));

      const detailed = await api
        .getUserInsigtsDetailed(period.detailed)
        .then((data) => {
          return data;
        })
        .catch(() => Promise.reject(`Cannot get detailed insites.`));

      const followUnfollow = await api
        .getFollowUnfollow()
        .then((data) => {
          return data;
        })
        .catch(() => Promise.reject("Cannot get follow/unfollow insights"));

      return { prevMonth, detailed, thisMonth, followUnfollow };
    } catch (error) {
      return Promise.reject(`Cannot get base insites.`);
    }
  }
);

const insightsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInsigts.fulfilled, (state, action) => {
      const { insites, period } = action.payload;
      state[period] = insites;
    });
    builder.addCase(getInsigts.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(getDetailedInsigts.fulfilled, (state, action) => {
      const { insites } = action.payload;
      state.detailed = insites;
    });
    builder.addCase(getDetailedInsigts.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(getBaseInsights.fulfilled, (state, action) => {
      const { prevMonth, detailed, thisMonth, followUnfollow } = action.payload;

      followUnfollow.date.forEach((element, index) => {
        followUnfollow.date[index] = timestampToDateWords(element);
      });

      console.log(followUnfollow);

      state.detailed = detailed;
      state.this_month = thisMonth;
      state.prevMonth = prevMonth;
      state.followUnfollow = followUnfollow;
    });
    builder.addCase(getBaseInsights.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

export default insightsSlice.reducer;
