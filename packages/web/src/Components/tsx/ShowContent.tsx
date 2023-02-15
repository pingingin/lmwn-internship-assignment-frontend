import React from "react";
import { menuFullType, RestaurantFullMenu } from './ModelType'
import Modal from './Modal';
import useModal from './useModal';
import { RiArrowDropDownLine } from 'react-icons/ri';
import '../css/Content.css'

export default function ShowContent(props: { keySearch: string, restaurant: RestaurantFullMenu, indexPage: number }) {
    const { isOpen, toggle } = useModal();

    function ShowPrice(props: { menu: menuFullType }) {
        if (props.menu.discountedPercent > 0) {
            return (<div>
            <p className="full-price">{props.menu.fullPrice} บาท</p>
            <p className="sale-price">{props.menu.fullPrice * ((100 - props.menu.discountedPercent) / 100)} บาท</p>
            </div>)
        }
        else {
            return (<div>
            <p className="sale-price">{props.menu.fullPrice} บาท</p>
            </div>)
        }
    }
    function ShowStock(props: { menu: menuFullType }) {
        if (props.menu.totalInStock === 0) {
            return (<p className="name-menu">{props.menu.name} (หมด)</p>)
        }
        else {
            return (<p className="name-menu">{props.menu.name}</p>)
        }
    }

    return (
        <>
            {
                props.restaurant?.menus.filter((menu) => {
                    if (props.keySearch === '') {
                        return true
                    }
                    return menu.name.toUpperCase().includes(props.keySearch.toUpperCase())
                }).map((menu, i) => {
                    if (i >= props.indexPage && i < props.indexPage + 10) {
                        return (
                            <div className="menus" onClick={() => toggle(i)} key={i}>
                                <img src={menu.thumbnailImage} width="100px" height="100px" />
                                <div className="detail">
                                    <ShowStock menu={menu}></ShowStock>
                                    <div className="price"><ShowPrice menu={menu}></ShowPrice></div>
                                </div>
                                <Modal keyOpen={i} isOpen={isOpen} toggle={() => toggle(i)} >
                                    <div className="container-modal">
                                        <div className="menu">
                                            <div></div><ShowStock menu={menu}></ShowStock>
                                            <div className="drop-down"><RiArrowDropDownLine onClick={() => toggle(i)} /></div>
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
                        )
                    }
                })
            }
        </>
    )
}