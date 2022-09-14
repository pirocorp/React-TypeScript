import { useEffect, useState } from "react";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import UserSection from "./components/UserSection/UserSection";
import IAllUsersResponse from "./interfaces/IAllUsersResponse";

const baseUrl = 'http://localhost:3005/api';

function App() {
    const [users, setUsers] = useState<IAllUsersResponse>()

    useEffect(() => {
        fetch(`${baseUrl}/users`)
            .then(res => res.json())
            .then(result => {
                if(result){
                    setUsers(result);
                }              
            })
    }, []);

    return (
        <div>
            <Header />

            <main className="main">            
                <section className="card users-container"> 
                    {/* <Search /> */}
                    <UserSection />
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default App;
