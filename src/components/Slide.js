import React from 'react'
import SlideToggle from "react-slide-toggle";

const Slide = () => {
  return (
    <>
    <SlideToggle
  render={({ toggle, setCollapsibleElement }) => (
    <div className="my-collapsible">
      <button className="my-collapsible__toggle" onClick={toggle}>
        toggle
      </button>
      <div className="my-collapsible__content" ref={setCollapsibleElement}>
        <div className="my-collapsible__content-inner">Collapsible content</div>
      </div>
    </div>
  )}
/>;
    
    
    
    </>
  )
}

export default Slide