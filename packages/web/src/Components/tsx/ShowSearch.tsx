import React from "react";
import '../css/Search.css'

export default function ShowSearch(props: { keySearch: string, onKeySearchChange: any, onIndexPageChange: any }) {
    return (
        <>
            <div className="box-search">
                <input className="search-bar" type="text" value={props.keySearch} onChange={(e) => { props.onKeySearchChange(e.target.value); props.onIndexPageChange(0) }} placeholder="ค้นหา.."></input>
                <button className="clear" onClick={(e) => { props.onKeySearchChange(''); props.onIndexPageChange(0) }}>ล้าง</button>
            </div>
        </>
    );
}