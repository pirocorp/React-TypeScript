import EmptyComponent from "./EmptyComponent";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import NotFoundComponent from "./NotFoundComponent";
import PageState from "./PageState";

function PageOverlapComponent(
    {
        pageState,
        message
    }: {
        pageState: PageState;
        message?: string;
    }) {

    switch(pageState){
        case PageState.Empty:
            return <EmptyComponent />
        case PageState.Error:
            return <ErrorComponent message={message} />
        case PageState.Loading:
            return <LoadingComponent />
        case PageState.NotFound:
            return <NotFoundComponent />
        case PageState.OK:
        default:
            return <></>
    }
}

export default PageOverlapComponent;