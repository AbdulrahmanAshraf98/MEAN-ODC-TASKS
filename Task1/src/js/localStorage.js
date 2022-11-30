export const readFromLocalStorage=(itemKey,resType="json")=>{
    let data=localStorage.getItem(itemKey);
    if(resType==="json"){
        try{
            data=JSON.parse(data)||[]
        }
        catch(e){
            data=[]
        }
    }
    return data;

}
export const writeDataToStorage = (itemKey,data)=> localStorage.setItem(itemKey, JSON.stringify(data));
