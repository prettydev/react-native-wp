const CHANGE_SAVE_DATA = 'CHANGE_SAVE_DATA';

export const change_save_data = (data) => ({
    type: CHANGE_SAVE_DATA, data
});

const initialState = {
    data: '',
}

export default reducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_SAVE_DATA:
            return {
                ...state,
                data: action.data
            }
            break;
        default:
            return state;
    }
}