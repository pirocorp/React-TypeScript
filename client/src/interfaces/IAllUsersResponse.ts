import IUser from "./IUser";

interface IAllUsersResponse {
    users: IUser[];
    count: number;
}

export default IAllUsersResponse;