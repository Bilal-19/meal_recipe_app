import './App.css'
import Favourites from "./Components/Favourites"
import Search from "./Components/Search"
import Meals from "./Components/Meals"
import Modal from "./Components/Modal"

import { useGlobalContext } from './Context'
import { Header } from './Components/Header'
function App() {

  const { showModal, favorites } = useGlobalContext()


  return (
    <>
      <main>
        <Header />
        <Search />
        {favorites.length > 0 && <Favourites />}
        {showModal && <Modal />}
        <Meals />
      </main >
    </>
  )
}

export default App
