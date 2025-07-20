
import { useEffect, useState } from 'react'
import '../App.css'
import { Button } from '../componenst/Button'
import { Card } from '../componenst/Cards'
import { CreateModelContent } from '../componenst/CreateContentModel'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../componenst/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false)
  const {contents, refresh} = useContent()
  useEffect(()=>{
     refresh()
  },[modalOpen])

  return <div>
    <Sidebar/>
    <div className='p-4 ml-72 bg-gray-100 border-2 min-h-screen'>
    <CreateModelContent open={modalOpen} onClose={() => {
      setModalOpen(false);
    }}/>
    <div className='gap-4 justify-end flex'>
    <Button onClick={() => {
      setModalOpen(true)
    }} variant='primary' text="Add Content" startIcon={<PlusIcon />} />
    <Button onClick={async()=>{
       const response= await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
            share:true
        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }
    )
       const shareUrl = `http://localhost:5173/${response.data.hash}`
       alert(shareUrl)
    }} variant='secondary' text="Share Brain" startIcon={<ShareIcon />} />
    </div>

    <div className='flex gap-4 flex-wrap'>
          {/* {JSON.stringify(contents)} */}
       {Array.isArray(contents) && contents.map(({type,title,link}) => 
        <Card type={type} 
               title = {title} 
              link = {link}
          />
       )}
     
      {/* <Card type='youtube' link="https://www.youtube.com/watch?v=Oo3qsxihXqY"
        title="First Video" /> */}

    </div>
    </div>
  </div>
}






export default Dashboard
