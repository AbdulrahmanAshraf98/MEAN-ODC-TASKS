export const selectElement=(selector)=>{
    const element = document.querySelector(selector);
    return element?element:null
};
export const addEvent=(element,eventType="click",callback)=>{
    element.addEventListener(eventType, callback);
}
export const getFormInputsData=(heads,inputsContainer)=>{
    const data = {}
    heads.forEach(head=> data[head]= inputsContainer.elements[head].value);
    return data;
}
export const validateInputsValue=(inputsValueObject)=>{
    data= Object.values(inputsValueObject);
    let valid=true;
    data.forEach(item=>{if(item==="")valid=false})
    return valid;
}
export const createDomElement=(element,value,options)=>{
    const createdElement=document.createElement(element);

    if(options){
        const attributesName=Object.keys(options);
        const attributesValues=Object.values(options);
        attributesName.forEach((item,index)=>createdElement.setAttribute(item,attributesValues[index])); 
    }
    if(value) createdElement.innerText=value;
    return createdElement;
}
export const clearUi=(parentElement)=>parentElement.innerHTML="";
export const addChildNodesToParentElement=(parentElement,childNodes)=>{
    if(!Array.isArray(childNodes)){
        parentElement.appendChild(childNodes);
        return;
    }
    childNodes.forEach(child=>parentElement.appendChild(child));

}
