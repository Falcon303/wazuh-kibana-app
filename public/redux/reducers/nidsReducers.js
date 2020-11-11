const initialState = {
    tabSelected: "nodes",
    nodeToEdit: "",
    addNodeForm: false,
    nodes: [],
};

const nidsReducers = (state = initialState, action) => {
    if (action.type === 'TAB') {
      return {
        ...state,
        tabSelected: action.payload
      };
    }  
    if (action.type === 'ADD_NODE') {
      return {
        ...state,
        addNodeForm: action.payload
      };
    }  
    if (action.type === 'NODES') {
      return {
        ...state,
        nodes: action.payload
      };
    }  
    if (action.type === 'EDIT_NODE') {
      return {
        ...state,
        nodeToEdit: action.payload
      };
    }  
    return state;
  };
  
  export default nidsReducers;