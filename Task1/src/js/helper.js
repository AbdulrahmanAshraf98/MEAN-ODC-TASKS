
export const addItemToArray=(array,item)=>{
    array.push(item);
    return array;
}
export const getItemFromArrayById=(array,id)=>{
    const item=array.find(item =>item.id===id);
    return item?item:null
};
export const deleteItemFromArrayById=(array,id)=>array.filter(item => item.id!==id);
export const modifyObjectProperty=(object,propertyName,value)=>{
    object[propertyName]=value;
    return object;
}
