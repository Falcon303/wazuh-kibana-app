const initialState = {
    tabSelected: "nodes",
    addNodeForm: false,
    nodes: [],
};

const nidsReducers = (state = initialState, action) => {
    if (action.type === 'TAB') {
      return {
        ...state,
        tabSelected: action.tab
      };
    }  
    if (action.type === 'ADD_NODE') {
      return {
        ...state,
        addNodeForm: action.status
      };
    }  
    if (action.type === 'NODES') {
      return {
        ...state,
        nodes: action.data
      };
    }  
    return state;
  };
  
  export default nidsReducers;