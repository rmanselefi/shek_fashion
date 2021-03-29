import
{
    ADD_PRODUCT,PRODUCT_ERROR,UPDATE_PRODUCT
}
from './types'
const initialState = {   
    saved: false,
    updated:false,
    hasError:false,
    error:{}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action:any) {
    const { type, payload } = action;

    switch (type) {       
        case ADD_PRODUCT:
            return {
                ...state,                
                saved:true
            }
        case UPDATE_PRODUCT:
            return{
                ...state,
                updated:true
            }
        case PRODUCT_ERROR:
            return {
                ...state,
                error: payload,
                hasError:true
            }       
            
        default:
            return state;
    
    }
}