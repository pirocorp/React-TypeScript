import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import UsersPage from "./pages/UsersPage/UsersPage";

function App() {
    return (
        <div>
            <Header />

            <main className="main">            
                <section className="card users-container"> 
                    <Search />
                    <UsersPage />
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default App;
