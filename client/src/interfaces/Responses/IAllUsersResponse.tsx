import IListedUser from "../Users/IListedUser";

interface IGetUsersResponse {
    users: IListedUser[];
    count: number;
    error?: string;
}

export default IGetUsersResponse;