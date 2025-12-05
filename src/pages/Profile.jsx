import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import auth from '../firebase/firebase.config';
import { updateProfile } from 'firebase/auth';

const Profile = () => {

    const {setUser,user} = useContext(AuthContext)
   
    const[isOpen, setIsOpen] = useState(false)

    const handleOpenForm = () =>{

       
        setIsOpen(!isOpen)
        
    }

    const handleUpdate = (e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value;

         updateProfile(auth.currentUser, {
  displayName: name, photoURL: photoUrl
}).then(() => {
 
 setUser({...user,photoURL:photoUrl, displayName:name })
}).catch((error) => {
  console.log(error)
  
});
    }


    return (
        <div className='flex flex-col justify-center items-center my-12'>
           <div className="avatar">
    <div className="w-12 ">
      <img src={user?.photoURL} />
    </div>
  </div>
  <p>{user?.displayName}</p>
  <p>{user?.email}</p>
  <button onClick={handleOpenForm} className='btn  bg-blue-950 text-white my-12'>Update Profile</button>
  

        {
            isOpen && (
                 <form onSubmit={handleUpdate} className="fieldset">
          <label className="label">Name</label>
          <input defaultValue={user?.displayName} name='name' type="text" className="input" placeholder="your name" />

          <label className="label">Photo Url</label>
          <input defaultValue={user?.photoURL} name='photoUrl' type="text" className="input" placeholder="your url" />
          

       
          <button className="btn btn-neutral mt-4 bg-white text-blue-950">Update</button>
        </form>
            )
        }

        </div>
    );
};

export default Profile;