import React,{useState,useEffect} from 'react'
import { ChevronsUp } from 'react-feather';


const BackToTop = () => {

    const [isVisible, setIsVisible] = useState(false);

    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);  
      } else {
        setIsVisible(false);  
      }
    };
  
    
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
 
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
  return (
    <>
      <div className='back-to-top-btn-cont' >
      {isVisible && (
        <button
          className="back-to-top-btn"
          onClick={scrollToTop}
        >
      <ChevronsUp size={18} color="#FFF" />
        </button>
      )}
    </div>
      
    </>
  )
}

export default BackToTop
