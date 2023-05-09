import React, { useEffect, useState } from 'react';
import "./homePage.css";
import Maps from "./RestaurantsMaps";
import Dropdown from './Dropdown';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = "keyfXgn8PL6pB3x32";
    fetch(`https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?maxRecords=3&view=Grid%20view&filterByFormula=SEARCH("${searchTerm.toLowerCase()}",LOWER({Name}))`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setRestaurants(data.records));
  }, [searchTerm]);

  const handleAddClick = (restaurant) => {
    console.log(restaurant);
    if (!selectedRestaurants.includes(restaurant)) {
      setSelectedRestaurants([...selectedRestaurants, restaurant]);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setIsOpen(true);

    const token = "keyfXgn8PL6pB3x32";
    fetch(`https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?maxRecords=3&view=Grid%20view&filterByFormula=SEARCH("${value.toLowerCase()}",LOWER({Name}))`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setSuggestions(data.records));
  };

  const handleBookmark = (restaurant) => {
    if (!bookmarkedRestaurants.includes(restaurant)) {
      setBookmarkedRestaurants([...bookmarkedRestaurants, restaurant]);
      console.log(bookmarkedRestaurants);     
    }
  };
 
  const handleRemove = (restaurant) => {
    console.log(restaurant);
    const newSelectedRestaurants = selectedRestaurants.filter(selected => selected !== restaurant);
    setSelectedRestaurants(newSelectedRestaurants);
    const newBookmarkedRestaurants = bookmarkedRestaurants.filter(bookmarked => bookmarked !== restaurant);
    setBookmarkedRestaurants(newBookmarkedRestaurants);
  };
const handleSelectVin = (event) => {
  console.log(event)
  handleAddClick(event);
}

const handleIsOpen = (event) => {
    setIsOpen(event);
}

const handlelogout = () => {
  localStorage.removeItem('isLogggedIn');
  navigate('/sign_in')
}
  return (
    <div>
      <div className='sidebar'>
      <div className='bookmark'>LOOP</div>
        <text style={{position: 'absolute',top: '12%', left: '3%'}}>Bookmarked Restaurants</text>
        <ul style={{ listStyle: 'none', padding: 0 ,position: 'absolute',top: '17%', left: '3%'}}>
        {
          bookmarkedRestaurants.map((restaurant, index) => (
            <li key={index} style={{ marginBottom: '10px', opacity: 0.6, cursor : 'pointer' }}>{restaurant}</li>
          ))
        }
      </ul>

      </div>
      <div className='main-content'>
        <div className='heading'>
          <div style={{cursor : 'pointer'}} onClick={handlelogout}>LogOut</div>
        </div>
        <h1>List of Restaurants</h1>
        <input
          type="text"
          placeholder="Search for restaurants"
          value={searchTerm} 
          onChange={handleInputChange}
          
          className='input_rest'  
        />
        <Dropdown options={restaurants} selectedVin = {handleSelectVin} open = {handleIsOpen} />
        <h2>Selected Restaurants</h2>
        <div className='maps'>
          <ul>
            {selectedRestaurants.map(restaurant => (
              
              <li key={restaurant}>
                <div className='res_name'>{restaurant}</div>
                <button className='bookmark_btn' type='button' onClick={() => handleBookmark(restaurant)}>Bookmark</button>
                <button className='remove_btn' type='button' onClick={() => handleRemove(restaurant)}>Remove</button>
                <Maps locations={restaurant} />  
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
