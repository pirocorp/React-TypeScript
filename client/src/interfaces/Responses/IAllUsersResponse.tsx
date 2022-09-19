import IListedUser from "../Users/IListedUser";
import IResponseWithError from "./IResponseWithError";

interface IListedUsersResponse extends IResponseWithError {
    users: IListedUser[];
    count: number;
}

export default IListedUsersResponse;