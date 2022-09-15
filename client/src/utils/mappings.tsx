import IAddEditUserForm from "../interfaces/Forms/AddEditUserForm";
import IUserAddress from "../interfaces/Users/IAddress";
import IAddUpdateUser from "../interfaces/Users/IAddUpdateUser";

export const mapFromIAddEditUserFormToIAddUpdateUser = (data: IAddEditUserForm): IAddUpdateUser => (
    {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        imageUrl: data.imageUrl,
        phoneNumber: data.phoneNumber,
        address: {
            city: data.city,
            country: data.country,
            street: data.street,
            streetNumber: data.streetNumber
        } as IUserAddress,
    } as IAddUpdateUser
);