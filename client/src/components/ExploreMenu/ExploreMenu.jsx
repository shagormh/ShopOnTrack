import React, { useEffect, useRef } from 'react'
import './exploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({ category, setCategory }) => {
   
      const menuRef = useRef(null);
    
      useEffect(() => {
        // Wait for the menu element to be rendered in the DOM
        if (menuRef.current) {
          const menuElement = menuRef.current;
    
          // Calculate the total scrollable width
          const totalWidth = menuElement.scrollWidth;
    
          // Optionally, adjust for potential margins or padding
          const adjustedWidth = totalWidth - menuElement.clientWidth;
    
          // Scroll to the last item smoothly (using requestAnimationFrame for performance)
          const scrollToLast = () => {
            let currentScrollPosition = 0;
            const scrollStep = 5; // Adjust scroll step size for desired animation speed
    
            const scroll = () => {
              currentScrollPosition += scrollStep;
              if (currentScrollPosition >= adjustedWidth) {
                currentScrollPosition = adjustedWidth; // Ensure we don't overscroll
              }
              menuElement.scrollLeft = currentScrollPosition;
    
              if (currentScrollPosition < adjustedWidth) {
                requestAnimationFrame(scroll);
              }
            };
    
            requestAnimationFrame(scroll);
          };
    
          scrollToLast();
        }
      }, []); // Re-run useEffect when menu items change
  
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className="explore-menu-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, iste, minus doloremque, hic cupiditate facere is possim.</p>
            <div ref={menuRef} className="explore-menu-list">
                {
                    menu_list.map((item, idx) => {
                       
                        return (
                            <>
                            <div key={item._id} onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} className="explore-menu-list-item">
                                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                                <p >{item.menu_name}</p>
                            </div>
                            </>
                        )
                    })
                }
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu