import { deleteItemFromArrayById } from "./helper";
import { readFromLocalStorage, writeDataToStorage } from "./localStorage";
import { addChildNodesToParentElement, addEvent, clearUi, createDomElement } from "./ui";

const switchStatusHandler=(index,users,user)=>{
    const newUser={...user,status:!user.status};
    users[index]=newUser;
    writeDataToStorage("users",users);
}
const deleteUserHandler=(users,id)=>{   
    users=deleteItemFromArrayById(users,id);
    writeDataToStorage("users",users);
 
}

const drawUserUi=(parentElement,users,user,index)=>{
    const userDivElement=createDomElement("div");
    const userNameElement=createDomElement("h3",user.username);
    const userPhoneElement=createDomElement("p",user.phone);
    const userAge=createDomElement("p",user.age);
    const userStatus=createDomElement("p",user.status?"active":"inactive");
    const switchStatusButton=createDomElement("button",user.status?"inactive":"active");
    addEvent(switchStatusButton,"click",(event)=>{
        event.preventDefault();
        switchStatusHandler(index,users,user);
        drawUsersUi(parentElement,users);
    })
    const deleteUserButton=createDomElement("button","delete");
    addEvent(deleteUserButton,"click",(event)=>{
        event.preventDefault();
        deleteUserHandler(users,user.id);
        drawUsersUi(parentElement,users);
    })
    addChildNodesToParentElement(userDivElement,[userNameElement,userPhoneElement,userAge,userStatus,switchStatusButton,deleteUserButton])
    addChildNodesToParentElement(parentElement,userDivElement);
}

export const drawUsersUi=(parentElement)=>{
    const users=readFromLocalStorage("users","json");
    if(!users)return;
    clearUi(parentElement);  
    users.forEach((user,index)=>drawUserUi(parentElement,users,user,index));

}