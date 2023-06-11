import React from 'react'

const TitleAndInfoForm = ({title,info}) => {
  return (
      <div className='information-form'>
        <h1 className='login-title'>{title}</h1>
        <p className='sub-title-login'>{info}</p>
    </div>
  )
}

export default TitleAndInfoForm