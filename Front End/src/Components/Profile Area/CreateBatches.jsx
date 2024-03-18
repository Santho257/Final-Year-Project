import { useState } from "react";
import axios from 'axios';
function CreateBatch() {
    const [name, setName] = useState('');
    const [mentor, setMentor] = useState('');
    const [students, setStudents] = useState([]);

    const [staffs, setStaffs] = useState([]);
    const [stus, setStus] = useState([]);

    axios.get('http://localhost:8080/staffs').then((data, err) => {
        setStaffs(data.data);
    });
    axios.get('http://localhost:8080/students').then((data, err) => {
        setStus(data.data);
    });
    const createBatch = async (event) => {
        event.preventDefault(); 
        const user = JSON.parse(localStorage.getItem("user"))._id;
        try {
            const res = await axios.post('http://localhost:8080/createBatch', { name, mentor, students });
            if (res.data) {
                alert(res.data.status)
            }
        } catch (error) {
            console.error('Not Created', error);
            alert("Couldn\'t create this batch");
        }
    }

    return (
        <>
            <form method="post" onSubmit={createBatch}>
                <section className="form-sect">
                    <label>Batch Name</label><br />
                    <input type="text" id="name" name="title" required="required" onChange={(e) => setName(e.target.value)} />
                </section>

                <section className="form-sect">
                    <select id="mentor" onChange={(e) => setMentor(e.target.value)}>
                        <option value="">Select Mentor</option>
                        {staffs.map((staff => {
                            return (<option key={staff._id} value={staff._id}>{staff.name}</option>);
                        }))}
                    </select>
                </section>

                <section className="form-sect">
                    <select id="students" multiple onChange={
                        (event) => {
                            const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
                            setStudents(selectedValues);
                        }}>
                        <option>Select Students</option>
                        {stus.map((student => {
                            return (<option key={student._id} value={student._id}>{student.name}</option>);
                        }))}
                    </select>
                </section>
                <div>
                    {students.map(stu => { return (<span key={stu}>{stu},</span>) })}
                </div>
                <section className="submit">
                    <input type="submit" value="Create Batch" />
                </section>
            </form>
        </>
    );
}

export default CreateBatch