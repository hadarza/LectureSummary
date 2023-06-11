import React from 'react'

const TitleAndInfoForm = ({title,info}) => {
  return (
      <>
        <h1 className='login-title'>{title}</h1>
        <p className='sub-title-login'>{info}</p>
    </>
  )
}

export default TitleAndInfoForm