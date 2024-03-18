import { useState } from 'react';
import axios from 'axios';

function AssignTasks() {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const assignTask = async (event) => {
        event.preventDefault(); 
        const user = JSON.parse(localStorage.getItem("user"))._id;
        try {
            const res = await axios.post('http://localhost:8080/assigntask', { name, desc, user });
            console.log("Posted")
            if (res.data) {
                alert(res.data.status)
            }
        } catch (error) {
            console.error('Couldn\'t add task', error);
            alert("Couldn\'t add task");
        }
    };
    return (<form method="post" onSubmit={assignTask}>
        <section className="form-sect">
            <label>Name</label><br />
            <input type="text" id="name" required="required" onChange={e => setName(e.target.value)}/>
        </section>
        <section className="form-sect">
            <label>Description</label><br />
            <input type="textarea" id="desc" required="required" onChange={e => setDesc(e.target.value)}/>
        </section>
        <input type="text" id="user" hidden/>
        <section className="submit">
            <input type="submit" value="Assign Task"/>
        </section>
    </form>
    );
}

export default AssignTasks;