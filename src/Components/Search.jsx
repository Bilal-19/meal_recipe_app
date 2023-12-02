import { useState } from "react"
import { useGlobalContext } from "../Context"


const Search = () => {

    const { setSearchTerm, fetchRandomMeal } = useGlobalContext()

    const [text, setText] = useState('')

    const handleChange = (event) => {
        setText(event.target.value)
        console.log(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (text) {
            setSearchTerm(text)
        }
    }

    const handleRandomMeal = () => {
        setSearchTerm(' ')
        fetchRandomMeal()
    }

    return (
        <>
            <header className="search-container">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={text} className="form-input" placeholder="type favorite meal" onChange={handleChange} />
                    <button className="btn" type="submit">Search</button>
                    <button className="btn btn-hipster" type="button" onClick={handleRandomMeal}>Surprise Me!</button>
                </form>
            </header >
        </>
    )
}

export default Search