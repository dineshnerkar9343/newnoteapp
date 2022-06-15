import React, { useContext } from 'react'
import HaproContext from '../context/HaproContext';
import HaboutContext from '../context/HaboutContext';
import HcourseContext from '../context/HcourseContext';

import { Hapro } from './Hapro';

import { Habout } from './Habout';

import { Hcourse } from './Hcourse';


const Home = () => {
  const context = useContext(HaproContext)
  const acontext = useContext(HaboutContext)
  const mcontext = useContext(HcourseContext)

// const {hapros, setHapros} = context;
// const {habouts, setHabouts} = acontext;
// const {hcourses, setHcourses} = mcontext;


  return (
  <>
  
<Hapro/>
<Habout/>
<Hcourse/>


     
      
  </>
  )
}

export default Home