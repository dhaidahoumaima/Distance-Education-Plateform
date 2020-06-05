import React from 'react';




class Footer extends React.Component{
    render(){

  return (
          <div style={{
                height: '80px', display: 'flex',
                flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', fontSize:'1rem',
                marginBottom:0, backgroundColor:'#343a40',color:'#f8f9fa'
            }}>
               <p> <b> © 2020 Copyright: oumaima dhaidah</b>  </p>
            </div>
        )
    }
    

}
export default Footer;