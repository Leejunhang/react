import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavigatePage = () => {
  const navigator = useNavigate();
  return (
    <div>
        <button onClick={()=>navigator(-1)}>뒤로가기</button>
        <button onClick={()=>navigator('/')}>홈으로 가기</button>
        <button onClick={()=>navigator('/profiles')}>인물 소개</button>
    </div>
  )
}

export default NavigatePage