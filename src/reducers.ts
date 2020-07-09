const defaultState = {};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_RUNTIME_VARIABLE':
            return { ...defaultState, ...state, ...action.payload };
        default:
            return state;
    }
};

export default reducer;
