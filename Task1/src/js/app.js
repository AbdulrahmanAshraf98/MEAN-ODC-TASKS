import { addItemToArray, deleteItemFromArrayById, getItemFromArrayById, modifyObjectProperty } from "./helper"
import { readFromLocalStorage, writeDataToStorage } from "./localStorage";
import { selectElement,addEvent, getFormInputsData, validateInputsValue} from "./ui";
import { drawUsersUi } from "./usersUi";

//formInputsName
const formHeads=['username',"age","phone","status"]
//selectedElements
const addUsersContainer=selectElement(".add-user");
const usersContainer=selectElement(".users");
//eventHandlers
const addNewUserHandler=(event)=>{
    event.preventDefault();
    const formData= getFormInputsData(formHeads,addUsersContainer); 
    if(!validateInputsValue(formData))return;
    const newUser={...formData,id:`user-${new Date().toISOString()}`,status:formData.status==="active"?true:false};
    let users=readFromLocalStorage("users","json");
    users= addItemToArray(users,newUser);
    writeDataToStorage("users",users);
    drawUsersUi(usersContainer);
}
//draw ui 

drawUsersUi(usersContainer);
//AddEvents
addEvent(addUsersContainer,"submit",addNewUserHandler)

