import React from 'react'
import {images} from '../constants'
import '../scss/Application.scss'
import {GrContact} from 'react-icons/gr'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {SiBookstack} from 'react-icons/si'


const AppWrap = (Component, idName) => function HOC() {
  return (
    <div id={idName}>
    

      <div className="login-section">
          <div className='section__info'>
          </div>
          <div className='section__input'>
              <Component/>

          </div>
        </div>

    </div>
  )
}

export default AppWrap