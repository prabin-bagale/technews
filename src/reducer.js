const reducer= (state,action)=>{
    switch(action.type){
        case 'SET_LOADING':
            return{
                ...state,
                isLoading :true,
            }
        case 'GET-STORIES':
            return{
                ...state,
                isLoading :false,
                hits:action.payload.hits,
                nbPages:action.payload.nbPages,
                
            }
         case 'REMOVE_POST':
            return{
                ...state,
                hits: state.hits.filter((curElem) =>curElem.objectID !== action.payload),
            }
         case 'SEARCH_QUERY':
            return{
                ...state,
                query :action.payload,
            }
        case 'NEXT_PAGE':
            let pageNumInc = state.Page + 1;

            if (pageNumInc >= state.nbPages) {
                pageNumInc = 0;
            }
            return {
                ...state,
                Page:pageNumInc,
            }
        case 'PREV_PAGE':
            let pageNum = state.Page - 1;

            if (pageNum <= 0) {
                pageNum = 0;
            }
            return {
                ...state,
                Page:pageNum,
            }
    }
    return state;
}
export default reducer;