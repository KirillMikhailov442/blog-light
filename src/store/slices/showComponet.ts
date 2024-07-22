import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  componets: {
    mobileNavList: false,
    searchBar: false,
  },
};

type PayloadType = keyof typeof initialState.componets;

const showComponetsSlice = createSlice({
  name: 'showComponets',
  initialState,
  reducers: {
    showComponent: (state, { payload }: { payload: PayloadType }) => {
      state.componets[payload] = true;
    },
    hideComponent: (state, { payload }: { payload: PayloadType }) => {
      state.componets[payload] = false;
    },
  },
});

export default showComponetsSlice.reducer;

export const { showComponent, hideComponent } = showComponetsSlice.actions;
