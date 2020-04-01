import React from 'react'
 
import DarkTheme from 'react-dark-theme'
 
function Theme (){
    const lightTheme = {
        background: 'white',
        text: 'black',
    }
       
      const darkTheme = {
        background: 'black',
        text: 'white',
    }
    return (
        <div>
          <DarkTheme light={lightTheme} dark={darkTheme} />
          Rest of your application
        </div>
      )
}
export default Theme