//register page-->>

import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const { err, setErr } = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {
      //firebase function-->>
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, displayName)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        (error) => {},
        () => {
          //firebase function-->>
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, 'userChats', res.user.uid), {})
            navigate('/')
          })
        },
      )
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatBot</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input required style={{ display: 'none' }} type="file" id="file" />
          <label htmlFor="file">
            {<FaCloudUploadAlt />}
            <span>Add profile pic</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Do you have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
