import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import AssignTasks from './Profile Area/AssignTasks'
import AddReviewDate from './Profile Area/AddReviewDate'
import ViewDocuments from './Profile Area/ViewDocuments'
import CreateBatches from './Profile Area/CreateBatches'
import AssignMarks from './Profile Area/AssignMarks'

function Profile({ role }) {
    const navi = useNavigate();
    const [action, setAction] = useSearchParams({});
    const [actions, setActions] = useState([]);
    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{if(!user) navi('/login')},[]);
    const logOut = () => {
        if (user) {
            localStorage.removeItem('user');
            navi('/login');
            location.reload();
        }
    }
    const getActions = async (user, func) => {
        try {
            let result = await axios(`http://localhost:8080/actions/role=${user.role}`);
            func(result.data);
        }
        catch (err) {
            console.log(err);
        }
    }
    if (user) {
        useEffect(() => { getActions(user, setActions) }, []);
    }
    return (
        <section id="shop">
            <section className="sections" id="categories">
                <h5 className="tittle">Actions</h5>
                <nav>
                    {<ul>
                        {
                            actions.map((act, index) => {
                                return (
                                    <li key={index} onClick={() => setAction({ action: act })}>{act}</li>
                                )
                            })
                        }
                        <li onClick = {logOut}>Log-out</li>
                    </ul>}
                </nav>
            </section>
            <section id="items">
                {/* {console.log(action.get("action"))} */}
                {(action.get("action") == "Assign Tasks") ? <AssignTasks />
                    : (action.get("action") == "Assign Review Date") ? <AddReviewDate />
                        : (action.get("action") == "View Verified Documents") || (action.get("action") == "Verify Documents") ? <ViewDocuments />
                            : (action.get("action") == "Provide Feedbacks") ? <ViewDocuments />
                                : (action.get("action") == "Create Batches") ? <CreateBatches />
                                    : (action.get("action") == "Assign Marks") ? <AssignMarks />
                                        : null}
            </section>
        </section>
    )
}

export default Profile;