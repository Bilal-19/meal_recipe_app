/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'


//Note:  useContext() cannot be called at top level. It can only be called inside a function

const AppContext = React.createContext()
// Now, AppContext contain methods such as provider, consumer

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites')

    if (favorites) {
        favorites = JSON.parse(localStorage.getItem('favorites'))
    }
    else {
        favorites = []
    }
    return favorites
}

const AppProvider = ({ children }) => {

    const [isLoading, setLoading] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')

    const [showModal, setShowModal] = useState(false)

    const [selectedMeal, setSelectedMeal] = useState(null)

    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

    const [meals, setMeals] = useState([])
    // Note: Everytime, the value of state changes, the component will re-render

    const fetchMeals = async (meal_url) => {
        setLoading(true)
        try {
            const { data } = await axios.get(meal_url)
            console.log(data.meals.map(item => console.log(item)))

            if (data.meals) {
                setMeals(data.meals)
            } else {
                setMeals([])
            }
        } catch (e) {
            console.log(e.response)
        }
        setLoading(false)
    }

    // If we dont use useEffect for fetching the data, then the function fetchMeals() will keep calling it self result in infinite loop.

    useEffect(() => {
        // Here we calling the callback function only when the component mounts --- passing '[]' as the second parameter
        // Note: If we don't pass second parameter, then the callback function will continously called that results in looping
        fetchMeals(allMealsUrl)
    }, [])


    useEffect(() => {
        if (!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])

    useEffect(() => {
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }

    const showMeal = (idMeal, favoriteMeal) => {
        let meal;
        if (favoriteMeal) {
            meal = favorites.find((item) => item.idMeal === idMeal)
        } else {
            meal = meals.find((item) => item.idMeal === idMeal)
        }
        setSelectedMeal(meal)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const addToFavorites = (idMeal) => {
        console.log('Add to favorite meal ID:', idMeal)
        const alreadyFavorites = favorites.find(value => value.idMeal === idMeal)

        // if the meal is already in the favourite list, then do nothing
        if (alreadyFavorites) return
        const newFavoriteMeal = meals.find(value => value.idMeal === idMeal)
        const updatedFavorites = [...favorites, newFavoriteMeal]
        setFavorites(updatedFavorites)

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }

    const removeFromFavorites = (idMeal) => {
        console.log('remove from favorites')
        const updatedFavorites = favorites.filter((item) => item.idMeal !== idMeal)
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))

    }

    return <AppContext.Provider
        value={{
            meals, isLoading, setSearchTerm,
            fetchRandomMeal, showModal, selectedMeal,
            showMeal, closeModal, addToFavorites,
            removeFromFavorites, favorites
        }}>
        {children}
    </AppContext.Provider >

}


// Creating a custom hook
const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }