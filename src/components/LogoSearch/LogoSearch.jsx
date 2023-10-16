import React from 'react'
import Chub from '../../img/logo-black.png'
import {UilSearch} from '@iconscout/react-unicons'
import {GrSearch} from "react-icons/gr"
import './LogoSearch.css'
import { Button } from '../Button/Button'
const LogoSearch = () => {
  return (
   <div className="LogoSearch">
   <div className="logo-img">
       <img className='logoimg' src={Chub} alt="C-Hub"/>
       </div>
      
       <div className="Search">
        
           <input type="text" name="search" className='search-bar' placeholder='#Explore' />
           
           <Button className={"option-button button"} icon={ <GrSearch  size={25}/>}/>
       
       </div>

   </div>
  )
}

export default LogoSearch