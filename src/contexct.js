import { type } from "@testing-library/user-event/dist/type";
import React, { useReducer ,useEffect} from "react";
import { useContext} from "react";
import reducer from "./reducer";

let API = 'https://hn.algolia.com/api/v1/search?';

const initialstate = {
    isLoading : true,
    query: 'css',
    nbPages: 0,
    Page: 0,
    hits:[],
}

const AppContext = React.createContext();

const AppProvider =({children}) =>{
    const [state,dispatch] = useReducer(reducer, initialstate);
     
  
    const fetchApiData = async(url)=>{
        dispatch({type:'SET_LOADNIG'});
        try {
            const res =  await fetch(url);
            const data = await res.json();
            console.log(data);
            dispatch({type:'GET-STORIES',
            payload:{
                hits:data.hits,
                nbPages:data.nbPages,
            },
            });
        } catch (error) {
            console.log(error);
        }
    }
    const removePost =(post_id)=>{
        dispatch({type:'REMOVE_POST',
                    payload:post_id
    })
    };
    const searchPost=(searchquery) =>{
        dispatch({type:'SEARCH_QUERY',
                payload: searchquery
    })
    }
    const getPrevPage =()=>{
        dispatch({type:'PREV_PAGE',})
    }
    const getNextPage =()=>{
        dispatch({type:'NEXT_PAGE',})
    }
    useEffect(() =>{
        fetchApiData(`${API}query=${state.query}&page=${state.Page}`);
    },[state.query,state.Page]);
    return (
    <AppContext.Provider value={{...state,removePost,searchPost,getPrevPage,getNextPage}}>
        {children}
    </AppContext.Provider>
    );
}

 const useGlobalContext =() =>{
    return useContext(AppContext);
}

export {AppContext,AppProvider,useGlobalContext};