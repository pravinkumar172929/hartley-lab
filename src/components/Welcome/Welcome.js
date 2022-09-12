import React from "react";
import { useSelector } from 'react-redux'

export default function Welcome() {
  const loginData = useSelector(state => state.app.login.data)

  return <div>
    Welcome, {loginData.firstName}
  </div>;
}
