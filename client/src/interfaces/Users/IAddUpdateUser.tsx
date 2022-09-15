import IUserAddress from "./IAddress";
import IBaseUser from "./IBaseUser";

interface ICreateUser extends IBaseUser {
    address: IUserAddress;
}

export default ICreateUser;