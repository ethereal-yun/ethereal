
export default {
    namespace: 'history',
    state: {
      hisList: [],
    },
    reducers: {
      isHistory:(state: any, { payload }) =>{    
        if(state.hisList.some((item)=>item.id ==payload.id)){
            return { ...state}
        } else{
            state.hisList.push(payload);              
        }
        return { ...state,payload};
      },
      unHistory(state:any,{payload}){
        const current=state.hisList.filter(item=>{
            return item.id !==payload
        }) 
        return {
            hisList:current
        }
      }
    },
}