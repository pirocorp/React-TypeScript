import IBaseUser from "./IBaseUser";

interface IListedUser extends IBaseUser {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export default IListedUser;