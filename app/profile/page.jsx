'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from '@components/profile'

const Profile = () => {

    const handleEdit = () => {

    }

    const handleDelete = async () => {
        
    }

  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={[]}
        handleEdit={}
        handleDelete={}
    />
  )
}

export default Profile
