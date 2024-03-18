function CreateBatch() {
    return (
        <>
            <form method="post" action="">
                <section class="form-sect">
                    <select name="review">
                        <option value="">Select Review</option>
                    </select>
                </section>
            </form>
            <section class="sections">
                <h3 class="title">Review title</h3>
                <table class="view-table">
                    <thead>
                        <th>S.No</th>
                        <th>Student Name</th>
                        <th>Marks</th>
                        <th>Feedback</th>
                        <th>Enter</th>
                    </thead>
                    <tbody></tbody>
                </table>
            </section>
        </>
    );
}

export default CreateBatch