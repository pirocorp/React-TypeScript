import { FormEvent, useEffect } from "react";

import UserAction from "../../../common/UserAction";
import IUserDetails from "../../../interfaces/Users/IUserDetails";
import UserDelete from "./UserDelete/UserDelete";
import UserDetails from "./UserDetails/UserDetails";
import UserAddEdit from "./UserAddEdit/UserAddEdit";

function UserActionModal({
    user,
    action,
    onClose,
    onEdit,
    onAdd,
}:{
    user: IUserDetails | null,
    action: UserAction,
    onClose: () => void,
    onEdit: (event: FormEvent<HTMLFormElement>, userId: string) => void,
    onAdd: (event: FormEvent<HTMLFormElement>) => void
}) {

    const handleKeyPress = (e: KeyboardEvent) => {
        if(e.key === 'Escape'){
            onClose();
        }
    }

    if(!user && action !== UserAction.Add){
        action = UserAction.None;
    }

    useEffect(() => {
        if(action !== UserAction.None) {  
            window.addEventListener('keyup', handleKeyPress);

            // clenaup function
            return () => {
                window.removeEventListener('keyup', handleKeyPress);            
            }
        }
    }, [action]);

    switch(action){
        case UserAction.Add:
            return <UserAddEdit user={user} onClose={onClose} onSaveButtonClick={onAdd} />
        case UserAction.Details:
            return <UserDetails user={user!} onClose={onClose} />
        case UserAction.Edit:
            return <UserAddEdit user={user!} onClose={onClose} onSaveButtonClick={onEdit} />
        case UserAction.Delete:
            return <UserDelete user={user!} onClose={onClose} />
        case UserAction.None:
        default:
            return <></>
    }
}

export default UserActionModal;