import PageOverlapComponent from "../../common/PageOverlapComponent/PageOverlapComponent";
import PageState from "../../common/PageOverlapComponent/PageState";

function UserPageOverlapComponent(
    {
        pageState,
        message
    }: {
        pageState: PageState;
        message?: string;
    }) {
    return (
        <div className="loading-shade">
            <PageOverlapComponent pageState={pageState} message={message} />
        </div>
    );
}

export default UserPageOverlapComponent;