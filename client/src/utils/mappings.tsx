import IAddEditUserForm from "../interfaces/Forms/AddEditUserForm";
import IAddUpdateUser from "../interfaces/Users/IAddUpdateUser";

export const mapFromIAddEditUserFormToIAddUpdateUser = (data: IAddEditUserForm): IAddUpdateUser => {
    const {firstName, lastName, email, phoneNumber, imageUrl, ...address} = data;
        
    return {
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        imageUrl,
        address
    }
};