import { XCircleIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Bottombar from './navigation/bottombar'
import Topbar from './navigation/topbar'

const Spin = () => { 
    const [staked, setstaked] = useState(0)
    const [win, setwin] = useState(0)
    const [modal, setmodal] = useState(false)
    const stake = [10,20,50,100,200,500,1000]
    const [wheel,setwheel] = useState()
    const [startButton, setbutton] = useState()
    const [display,setdisplay] = useState()
    useEffect(()=>{
        setwheel(document.querySelector('#wheel'))
        setbutton(document.querySelector('#button'))
        setdisplay(document.querySelector('#display'))
    },[])
    
  
  let deg = 0;
  let zoneSize = 45; // deg

  // Counter clockwise
  const symbolSegments = {
    1: 0.5,
    2: 0,
    3: 6,
    4: 5,
    5: 4,
    6: 3,
    7: 2,
    8: 1,
  }


  const handleWin = (actualDeg) => {
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
    const segment_value = symbolSegments[winningSymbolNr];
    display.innerHTML = segment_value
    setwin(staked * segment_value)
    setmodal(true)
    // alert(`You have won ${win}`)
    //update balance if won
  }

  const handleClick = () => {
    const find_stake = stake.indexOf(staked)
    if(find_stake === -1) return alert('Invalid stake')
    axios.post('/api/spin/',{staked}) //send stake userid,username
    //chack balance
    //minus balance

    display.innerHTML = "-";
    startButton.style.pointerEvents = 'none';
    deg = Math.floor(2880 + Math.random() * 90)
    wheel.style.transition = 'all 10s ease-out';
    wheel.style.transform = `rotate(${deg}deg)`;
    wheel.classList.add('blur');
  };

  const transitionend = () => {
    wheel.classList.remove('blur');
    startButton.style.pointerEvents = 'auto';
    wheel.style.transition = 'none';
    const actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    handleWin(actualDeg);
  }
    
  return (
    <div className=''>
        <Topbar/>
        <div className='relative h-screen flex flex-col gap-2 pt-10 items-center bg-purple-600 sm:pt-5'>
            <div ref={display} id='display' className='text-white text-lg'></div>
            <div className='flex justify-center'>
                <Image  id='marker' className='absolute z-10' src='/spin/marker.png' alt='pointer' width={50} height={50}/>
                <Image ref={wheel} onTransitionEnd={transitionend} className='w-72' id='wheel'  src='/spin/wheel.png' alt='wheel' width={400} height={400}/>

            </div>
            <div className='text-lg text-white'>Stake: {staked}</div>
            <div className='grid grid-cols-4 gap-2'>
                {
                    stake.map((stake)=>{
                        return (
                            <div key={stake} 
                            className='flex justify-center py-2 px-4 w-16 bg-slate-400 text-white hover:cursor-pointer'
                            onClick={()=>{setstaked(stake)}}
                            >{stake}</div>
                        )
                    })
                }

            </div>
            <Image ref={startButton} onClick={()=>handleClick()}  id='button' src='/spin/button.png' alt='button' width={200} height={50}/>
            
            <div className={`${!modal?'hidden':'flex'} items-center absolute top-44 p-5 rounded-md min-w-[40%] min-h-[30%] bg-white z-10 text-black sm:min-w-[4%]`}>
              <XCircleIcon className='h-6 absolute self-start ml-[60%]' onClick={()=>{setmodal(false)}}/>
              You have won {win}
            </div>
        </div>

        <Bottombar/>
    </div>
  )
}

export default Spin