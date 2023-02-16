import React, { useState, useEffect } from "react";
import axios from "axios";
import { RestaurantFullMenu } from './Components/tsx/ModelType'
import ShowContent from "./Components/tsx/ShowContent";
import ShowChangePage from "./Components/tsx/ShowChangePage";
import ShowSearch from "./Components/tsx/ShowSearch";
import './App.css';


function App() {
  type getRestaurantAll = {restaurant: {name: string, id: string}[]}
  const [isHomepage, setIsHomepage] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [indexPage, setIndexPage] = useState(0);
  const [keySearch, setKeySearch] = useState("");
  const [restaurant, setRestaurant] = useState<RestaurantFullMenu>();
  const [homepage, setHomepage] = useState<getRestaurantAll>();
  const yourParamName = new URL(window.location.href);

  useEffect(() => {
    axios
      .get("http://localhost:3001" + yourParamName.pathname)
      .then((res) => {
        console.log(res.data);
        if (yourParamName.pathname.includes('restaurant')) {
          setRestaurant(res.data);
          document.title = res.data.name;
          setIsHomepage(false)
        }
        else if(yourParamName.pathname === '/') {
          setHomepage(res.data)
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  else if(isHomepage) {
    return (
      <div className="home-page">
        <p>ยินดีต้อนรับ กรุณาเลือกร้านอาหาร</p>
        {homepage?.restaurant.map((no, i) => {
          return (<div className="link" key={i}>
                  <a href={`http://localhost:3000/restaurants/${no.id}`}>{no.name} {no.id}</a>
                </div>
        )})}
      </div>
    )}
  return (
    <div>
      <div className="banner" style={{ backgroundImage: `url(${restaurant?.coverImage})` }}><div></div></div>
      <div className="container">
        <p className="restaurant-name">{restaurant?.name}</p>
        <p>
          เวลาทำการ {restaurant?.activeTimePeriod.open} - {restaurant?.activeTimePeriod.close}
        </p>
        <ShowSearch keySearch={keySearch} onKeySearchChange={setKeySearch} onIndexPageChange={setIndexPage}></ShowSearch>
        <ShowContent keySearch={keySearch} restaurant={restaurant!} indexPage={indexPage}></ShowContent>
        <ShowChangePage keySearch={keySearch} menus={restaurant?.menus!} indexPage={indexPage} onIndexPageChange={setIndexPage}></ShowChangePage>
      </div>
    </div>
  );
}

export default App;
