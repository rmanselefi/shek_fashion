import
{
    ADD_PRODUCT,PRODUCT_ERROR
}
from './types'
const initialState = {   
    saved: false,
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