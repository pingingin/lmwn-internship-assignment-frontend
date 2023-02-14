import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from './Components/Modal';
import useModal from './Components/useModal';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';
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
  const [indexPage, setIndexPage] = useState(0);
  const [keySearch, setkeySearch] = useState("");
  const { isOpen, toggle } = useModal();
  const [restaurant, setRestaurant] = useState<RestaurantFullMenu>();
  const yourParamName = new URL(window.location.href);

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

  

  function ShowChangePage(props: {keySearch:string, menus: menuFullType[], indexPage: number}) {
    // function maxLengthMenu(keySearch: string, menus: menuFullType[]) {
    //   console.log(menus.filter((menu:any)=>{
    //     console.log(menu.name);
    //     console.log(menu.name.includes(keySearch));
        
        
    //   }));
      
    //   return (menus.filter((menu:any)=>{
    //     menu.name.includes(keySearch)
    //   }).length)
    // }
    const maxLengthMenu = props.menus.filter((menu:menuFullType)=>{
      return menu.name.includes(keySearch)
    }).length


    if(props.indexPage==0 && props.indexPage+10 >= maxLengthMenu){
      return(
      <div className="count-page">
        <div className="disable-button" onClick={()=>setIndexPage(props.indexPage-10)}><GrFormPrevious/></div>
        <div className="page"><p>{props.indexPage / 10 + 1}</p></div>
        <div className="disable-button" onClick={()=>setIndexPage(indexPage+10)}><GrFormNext/></div>
      </div>
    )}
    else if(props.indexPage==0){
      return(
      <div className="count-page">
        <div className="disable-button" onClick={()=>setIndexPage(props.indexPage-10)}><GrFormPrevious/></div>
        <div className="page"><p>{props.indexPage / 10 + 1}</p></div>
        <div onClick={()=>setIndexPage(indexPage+10)}><GrFormNext/></div>
      </div>
    )}
    else if(props.indexPage+10 >= maxLengthMenu){
      return(
        <div className="count-page">
          <div onClick={()=>setIndexPage(props.indexPage-10)}><GrFormPrevious/></div>
          <div className="page"><p>{props.indexPage / 10 + 1}</p></div>
          <div className="disable-button" onClick={()=>setIndexPage(indexPage+10)}><GrFormNext/></div>
        </div>
    )}
    else {
      return(
        <div className="count-page">
          <div onClick={()=>setIndexPage(props.indexPage-10)}><GrFormPrevious/></div>
          <div className="page"><p>{props.indexPage / 10 + 1}</p></div>
          <div onClick={()=>setIndexPage(props.indexPage+10)}><GrFormNext/></div>
        </div>
    )}
  }

  function showContent(props: {keySearch: string, restaurant:RestaurantFullMenu}) {
    return(<>
      {props.restaurant.menus.filter(menu=>{console.log(menu.name.includes(keySearch));
       menu.name.includes(keySearch)}).map((menu, i) => {
          console.log(menu);
          
          // if(i >= indexPage && i < indexPage + 10)
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
                            <ul key={i}><p>{option.label}</p>
                              {
                                option.choices.map((choice, i) => {
                                  return (
                                    <li key={i}>{choice.label}</li>
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
    </>)
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
        <div>
          <input type="text" value={keySearch} onChange={(e)=>{setkeySearch(e.target.value);setIndexPage(0)}}></input>
          <button onClick={(e)=>{setkeySearch('');setIndexPage(0)}}>ล้าง</button>
        </div>
        <ShowChangePage keySearch={keySearch} menus={restaurant?.menus!} indexPage={indexPage}></ShowChangePage>
        {/* <Search keySearch={keySearch} restaurant={restaurant!}></Search> */}
        {console.log(keySearch)}
        
        {/* {restaurant?.menus.map((menu, i) => { */}
        {restaurant?.menus.filter((menu) => {
          if(keySearch === ''){
            return true
          }
          return menu.name.includes(keySearch)
        }).map((menu, i) => {
          
          if(i >= indexPage && i < indexPage + 10)
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
                            <ul key={i}><p>{option.label}</p>
                              {
                                option.choices.map((choice, i) => {
                                  return (
                                    <li key={i}>{choice.label}</li>
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
