import IListedUser from "../Users/IListedUser";
import IResponseWithError from "./IResponseWithError";

interface IAddUpdateUserResponse extends IResponseWithError {
    user?: IListedUser;
}

export default IAddUpdateUserResponse;