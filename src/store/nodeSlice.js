import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges:[],
};

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNodeToStore: (state, action) => {
      state.nodes.push({
        id: action.payload.id,
        type: action.payload.type,
        position: action.payload.position,
        data: action.payload.data,
      });
    },
    removeNodeToStore:(state,action)=>{
      state.nodes = state.nodes.filter(node => node.id !== action.payload)
    },
    addFieldToStore:(state,action)=>{
        const {tableName, fieldData} = action.payload;
        const node = state.nodes.find((node)=> node.id === tableName);
        if(node){
            node.data["fields"] = fieldData;
        }
    },
    clearStoreNode:(state,action)=>{
      state.nodes = []
      state.edges = []
    }
    
  },
});

export const {
    addNodeToStore,
    addFieldToStore,
    clearStoreNode,
    removeNodeToStore,
} = nodesSlice.actions;

export default nodesSlice.reducer;
