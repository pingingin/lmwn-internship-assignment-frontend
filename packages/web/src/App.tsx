import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from './Components/Modal';
import useModal from './Components/useModal';
import { RiArrowDropDownLine } from 'react-icons/ri';
import './App.css';

function App() {
  type menuFullType = {
    name: string
    id: string
    thumbnailImage?: string
    fullPrice: number
    discountedPercent: number
    discountedTimePeriod?: {
      begin: string
      end: string
    }
    sold: number
    totalInStock: number
    largeImage?: string
    options: {
      label: string
      choices: {
        label: string
      }[]
    }[]
  };

  type RestaurantFullMenu = {
    name: string
    id: number
    coverImage: string
    menus: menuFullType[]
    activeTimePeriod: {
      open: string
      close: string
    }
  }

  const [isLoading, setLoading] = useState(true);
  const { isOpen, toggle } = useModal();
  const [restaurant, setRestaurant] = useState<RestaurantFullMenu>();
  const yourParamName = new URL(window.location.href);
  console.log(yourParamName.pathname);

  useEffect(() => {
    axios
      .get("http://localhost:3001" + yourParamName.pathname)
      .then((res) => {
        console.log(res.data);
        setRestaurant(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function ShowPrice(props: {menu: menuFullType}) {
    if(props.menu.discountedPercent > 0) {
      return(<div>
        <p className="full-price">{props.menu.fullPrice} บาท</p>
        <p className="sale-price">{props.menu.fullPrice * ((100 - props.menu.discountedPercent) / 100)} บาท</p>
      </div>)
    }
    else {
      return(<div>
        <p className="sale-price">{props.menu.fullPrice} บาท</p>
      </div>)
    }  
  }

  return (
    <div>
      <div className="banner" style={{ backgroundImage: `url(${restaurant?.coverImage})` }}><div></div></div>
      <div className="container">
        <p className="restaurant-name">{restaurant?.name}</p>
        <p>
          เวลาทำการ {restaurant?.activeTimePeriod.open} -
          {restaurant?.activeTimePeriod.close}
        </p>
        {restaurant?.menus.map((menu, i) => {
          return (
            <div className="menus" onClick={() => toggle(i)} key={i}>
              <img src={menu.thumbnailImage} width="100px" height="100px" />
              <div className="detail">
                <p className="name-menu">{menu.name}</p>
                <div className="price"><ShowPrice menu={menu}></ShowPrice></div>
              </div>
              <Modal keyOpen={i} isOpen={isOpen} toggle={() => toggle(i)} >
                <div className="container-modal">
                  <div className="menu">
                    <div></div><p className="name-menu">{menu.name}</p><div className="drop-down"><RiArrowDropDownLine onClick={() => toggle(i)}/></div>
                  </div>
                  <div className="img-modal" style={{ backgroundImage: `url(${menu?.largeImage})` }}><div></div></div>
                  <div className="content">
                  <div className="price"><ShowPrice menu={menu}></ShowPrice></div>
                    <div className="label">
                      {
                        menu.options.map((option, i) => {
                          return (
                            <ul><p>{option.label}</p>
                              {
                                option.choices.map((choice, i) => {
                                  return (
                                    <li>{choice.label}</li>
                                  )
                                })
                              }
                            </ul>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
