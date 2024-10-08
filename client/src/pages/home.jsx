import { useState, useEffect } from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';

const Home = () => {
  const [loaded, setLoaded] = useState(false);

//Animation for the home page
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
    <div 
    className={`h-screen flex flex-col bg-[url('../src/assets/background.jpeg')] bg-auto `} 
    //style={{ background: 'linear-gradient(to bottom, #8A2BE2, #00FFFF)' }}
    
    >
      <Header />
      <div className={`text-4xl text-black flex flex-col flex-wrap text-center items-center justify-center h-full mb-20 ${loaded ? 'fade-in' : ''}`}>
        <h1 className='font-bold text-6xl bg-white bg-opacity-80  '>Find what you're <a className='italic'>Craven</a>™</h1>
        <Link to="/signup">
        <a
          type='button'
          className='text-white font-semibold bg-primaryColor hover:bg- rounded-lg py-2 px-2 mt-4 hover:bg-secondaryColor'
        >
          Start Now
        </a>
        </Link>

      </div>
    </div>
    </>
  );
};

export default Home;
