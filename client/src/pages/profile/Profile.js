import React, { useContext, useEffect, useState } from 'react'
import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios'
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom'

const Profile = () => {
    const history = useHistory();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const params = useParams();
    const username = params.username;
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username])

    useEffect(() => {
        const token = localStorage.getItem('AuthToken');
        if (!token) history.push('/login');
    }, []);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src={user.coverPicture ? PF + user.coverPicture : PF + "noCover.png"} alt="" />
                            <img className='profileUserImg' src={user.profilePicture ? PF + user.profilePicture : PF + "noAvatar.png"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile