function AddReviewDate() {
    return (<form method="post" action="">
        <section className="form-sect">
            <label for="name">Review Task</label><br />
            <input type="text" id="name" name="title" placeholder="Product-Name" required="required" />
        </section>
        <section className="form-sect">
            <label for="desc">Description for Review</label><br />
            <input type="textarea" id="desc" name="desc" placeholder="Descriptions" required="required" />
        </section>
        <section className="form-sect">
            <label for="date">Date</label><br />
            <input type="date" id="date" name="date"  required="required" />
        </section>
        
        <section className="submit">
            <input type="submit" value="Assign Task" name="assgn_task" />
        </section>
    </form>
    );
}

export default AddReviewDate;