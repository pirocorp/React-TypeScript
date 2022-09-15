import { FormEvent, useEffect, useState } from "react";

import * as userService from "../../services/userService";

import { getFormData } from "../../utils/utils";
import { mapFromIAddEditUserFormToIAddUpdateUser } from "../../utils/mappings";

import IUserDetails from "../../interfaces/Users/IUserDetails";
import UserAction from "../../common/UserAction";
import UserActionModal from "../../components/UserList/UserActionModal/UserActionModal";
import IAddEditUserForm from "../../interfaces/Forms/AddEditUserForm";
import IGetUsersResponse from "../../interfaces/Responses/IAllUsersResponse";
import UserList from "../../components/UserList/UserList";
import PageState from "../../common/PageOverlapComponent/PageState";

import UserPageOverlapComponent from "../../components/UserPageOverlapComponent/UserPageOverlapComponent";

function UsersPage() {
    const [selectedUserAction, setSelectedUserAction] =
        useState<{user: IUserDetails | null, action: UserAction}>({user: null, action: UserAction.None});

    const [usersResponse, setUsersResponse] =
        useState<IGetUsersResponse>({ users: [], count: 0 });

    const [pageState, setPageState] = useState(PageState.Loading);

    useEffect(() => {
        userService
            .getUsers()
            .then(r => {
                setUsersResponse(r);

                if(r.error){
                    setPageState(PageState.Error);                    
                }else if(r.count > 0){
                    setPageState(PageState.OK);
                } else {
                    setPageState(PageState.Empty);
                }
            });
    }, []);

    const userActionClickHandler = (action: UserAction, userId: string) => {
        userService
            .getDetails(userId)
            .then(responseUser => {
                setSelectedUserAction({
                    action: action,
                    user: responseUser
                });
            });
    };

    const closeHandler = () => {
        setSelectedUserAction({
            action: UserAction.None,
            user: null
        });
    }

    const addHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = getFormData<IAddEditUserForm>(event.target);
        const userData = mapFromIAddEditUserFormToIAddUpdateUser(data);

        userService
            .create(userData)
            .then((user) => {
                setUsersResponse(state => { return { ...state, users: [...state.users, user] } });
                closeHandler();
            });
    }

    const editHandler = (event: FormEvent<HTMLFormElement>, userId: string) => {
        event.preventDefault();

        const data = getFormData<IAddEditUserForm>(event.target);
        const userData = mapFromIAddEditUserFormToIAddUpdateUser(data);

        userService
            .edit(userId, userData)
            .then((user) => {
                setUsersResponse(state => { return { ...state, users: state.users.map(u => u._id === user._id ? user : u) } });
                closeHandler();
            });
    }

    return (
        <>
            <div className="table-wrapper">
                {
                    <UserActionModal
                        user={selectedUserAction.user}
                        action={selectedUserAction.action}
                        onClose={closeHandler}
                        onAdd={addHandler}
                        onEdit={editHandler}
                    />
                }

                {
                    pageState !== PageState.OK
                        ?   <UserPageOverlapComponent pageState={pageState} message={usersResponse.error} />
                        : <></>
                }

                <UserList users={usersResponse.users} userActionClickHandler={userActionClickHandler} />
            </div>
            <button className="btn-add btn" onClick={() => setSelectedUserAction({ user: null, action: UserAction.Add })}>Add new user</button>
        </>
    );
}

export default UsersPage;