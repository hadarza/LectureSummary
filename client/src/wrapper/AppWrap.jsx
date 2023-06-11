import React from 'react'
import '../scss/Application.scss'

const AppWrap = (Component, idName,imgSection) => function HOC() {
  return (
    <div id={idName}>
    

      <div className="login-section">
        <div className='section__input'>
          <Component/>
        </div>
        <div className='section__info'>
          <img src={imgSection} alt="img-bg"/>
        </div>
      </div>

    </div>
  )
}

export default AppWrap