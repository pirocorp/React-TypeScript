import IUserAddress from "./IAddress";
import IListedUser from "./IListedUser";

interface IUserDetails extends IListedUser {
    address: IUserAddress
}

export default IUserDetails;