import React, { useState } from "react";
import { menuFullType } from './ModelType'
import '../css/ChangePage.css'

export default function ShowChangePage(props: { keySearch: string, menus: menuFullType[], indexPage: number , onIndexPageChange: any}) {
    const maxLengthMenu = props.menus.filter((menu: menuFullType) => {
      return menu.name.toUpperCase().includes(props.keySearch.toUpperCase())
    }).length

    if (props.indexPage == 0 && props.indexPage + 10 >= maxLengthMenu) {
      return (
        <ul className="count-page">
          <li className="disable-button left first" onClick={() => props.onIndexPageChange(0)}><p>หน้าแรก</p></li>
          <li className="disable-button left" onClick={() => props.onIndexPageChange(props.indexPage - 10)}><p>ก่อนหน้า</p></li>
          <li className="page"><p>{props.indexPage / 10 + 1}</p></li>
          <li className="disable-button right" onClick={() => props.onIndexPageChange(props.indexPage + 10)}><p>ถัดไป</p></li>
          <li className="disable-button right last" onClick={() => props.onIndexPageChange(Math.floor((maxLengthMenu) / 10) * 10)}><p>หน้าสุดท้าย</p></li>
        </ul>
      )
    }
    else if (props.indexPage == 0) {
      return (
        <ul className="count-page">
          <li className="disable-button left first" onClick={() => props.onIndexPageChange(0)}><p>หน้าแรก</p></li>
          <li className="disable-button left" onClick={() => props.onIndexPageChange(props.indexPage - 10)}><p>ก่อนหน้า</p></li>
          <li className="page"><p>{props.indexPage / 10 + 1}</p></li>
          <li className="right" onClick={() => props.onIndexPageChange(props.indexPage + 10)}><p>ถัดไป</p></li>
          <li className="right last" onClick={() => props.onIndexPageChange(Math.floor((maxLengthMenu) / 10) * 10)}><p>หน้าสุดท้าย</p></li>
        </ul>
      )
    }
    else if (props.indexPage + 10 >= maxLengthMenu) {
      return (
        <ul className="count-page">
          <li className="left first" onClick={() => props.onIndexPageChange(0)}><p>หน้าแรก</p></li>
          <li className="left" onClick={() => props.onIndexPageChange(props.indexPage - 10)}><p>ก่อนหน้า</p></li>
          <li className="page"><p>{props.indexPage / 10 + 1}</p></li>
          <li className="disable-button right" onClick={() => props.onIndexPageChange(props.indexPage + 10)}><p>ถัดไป</p></li>
          <li className="disable-button right last" onClick={() => props.onIndexPageChange(Math.floor((maxLengthMenu) / 10) * 10)}><p>หน้าสุดท้าย</p></li>
        </ul>
      )
    }
    else {
      return (
        <ul className="count-page">
          <li className="left first" onClick={() => props.onIndexPageChange(0)}><p>หน้าแรก</p></li>
          <li className="left" onClick={() => props.onIndexPageChange(props.indexPage - 10)}><p>ก่อนหน้า</p></li>
          <li className="page"><p>{props.indexPage / 10 + 1}</p></li>
          <li className="right" onClick={() => props.onIndexPageChange(props.indexPage + 10)}><p>ถัดไป</p></li>
          <li className="right last" onClick={() => props.onIndexPageChange(Math.floor((maxLengthMenu) / 10) * 10)}><p>หน้าสุดท้าย</p></li>
        </ul>
      )
    }
  }