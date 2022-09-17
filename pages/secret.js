import React from 'react'
import Header from '../components/Header';

export default function Secret(props) {
   // console.log("Hi props here =>", props)
   return (
      <div>
         <Header />
         <h3>Secret Page!!</h3>
      </div>
   )
}

Secret.getInitialProps = async ({ query }) => {
   // console.log("Hi query Here => " ,query)
   return {
      query
   }
}