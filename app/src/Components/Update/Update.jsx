import React from 'react'
import { Link } from 'react-router-dom'
import UserMessages from '../Home/UserMessages'
import UserProfile from '../Home/UserProfile'
import UpdateName from './UpdateName'
import UpdatePassword from './UpdatePassword'

export default function Update() {
  return (
    <>
    
    <div className="container py-5">
        <div className="row">
            <div className="col-md-4">
                <UserProfile/>
            </div>
            <div className="col-md-8">
                <UpdatePassword/>
                <UpdateName/>
            </div>
        </div>
    </div>
    </>
  )
}
