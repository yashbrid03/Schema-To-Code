import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  relation: [],
};

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    addTable: (state, action) => {
      state.data.push({tableName:action.payload.tableName, field: {} });
    },
    removeTable: (state, action) => {
      state.data = state.data.filter(table => table.tableName !== action.payload);
    },
    clearStore: (state,action) =>{
      state.data = []
      state.relation = []
    },
    setFieldState:(state,action)=>{
      const {tableName, fieldData} = action.payload;
      console.log(fieldData)
      const table = state.data.find(table => table.tableName === tableName);
      if(table){
        console.log(table.tableName)
        table.field = fieldData;
      }else {
        // If the table is not found, you might want to log or handle this scenario
        console.error(`Table with name ${tableName} not found`);
      }
    },
    
    addRelation: (state, action) => {
      state.relation.push(action.payload);
    },
    removeRelation: (state, action) => {
      state.relation = state.relation.filter(
        relation => !(relation.source === action.payload.source && relation.target === action.payload.target)
      );
    },
  },
});

export const {
  addTable,
  removeTable,
  setFieldState,
  addRelation,
  removeRelation,
  clearStore,
} = tablesSlice.actions;

export default tablesSlice.reducer;
