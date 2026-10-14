import React, { useEffect, useState } from 'react'
import { fen } from '../assets/images'
import Stories_Cart from './Stories_Cart'

interface StoryItem {
  id: number;
  name?: string;
  image?: string;
}

function Stories() {
  const [stories, setStories] = useState<StoryItem[]>([])

  const API_URL = import.meta.env.VITE_API || 'http://localhost:5000'

  useEffect(() => {
    fetch(`${API_URL}/stories`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setStories(data)
        }
      })
      .catch((err) => console.error('Story çekme hatası:', err))
  }, [API_URL])
  const displayStories = stories.length > 0 ? stories : [{ id: 1, image: fen }]

  return (
    <section className='mb-4'>
      <div className='lg:px-0 lg:mx-0'>
        <div className='gap-3 py-0.5 text-[0px] whitespace-nowrap flex overflow-x-auto'>
          {displayStories.map((item) => {
            const imgSrc = item.image?.startsWith('/uploads')
            
              ? `${API_URL}${item.image}`
              : item.image || fen
              console.log(imgSrc);
              
            return (
              <Stories_Cart 
                key={item.id} 
                image={imgSrc}
                name={item.name} 
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Stories