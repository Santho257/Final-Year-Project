const mongoose = require('mongoose');

const student = new mongoose.Schema({
    _id: "string",
    dob: "string",
    department: "string",
    name: "String",
    year: {
        type: "number",
        min: 1,
        max: 5
    },
    mentor: "string",
    coordinator: "string",
    batch: "ObjectId",
    projects: {
        type: "array",
        items: {
            type: "objectId"
        }
    },
    tasks: {
        type: "array",
        items: {
            type: "objectId",
        }
    },
    notifications: {
        type: "array",
        items: {
            type: "objectId",
        }
    },
    performance: {
        type: "object",
        properties: {
            reviews: "objectId",
            marks: {
                type: "number",
                min: 0,
                max: 100
            }
        },
    },
    created_at: {
        type: "date",
        default: Date.now
    },
    updated_at: {
        type: "date",
        default: Date.now
    }
});

const staffs = new mongoose.Schema({
    _id: "string",
    name: "string",
    department: "string",
    batches: {
        type: "array",
        items: {
            type: "objectId"
        }
    },
    created_at: {
        type: "date",
        default: Date.now
    },
    updated_at: {
        type: "date",
        default: Date.now
    }
});

const roles = new mongoose.Schema({
    _id: "String",
    role: {
        type: "String",
        enum: ["Coordinator", "Mentor", "Student"]
    },
    actions: [String]
});

const userSchema = new mongoose.Schema({
    _id: "string",
    password: "string",
    role: "string",
    profile: {
        type: "object",
        required: ["name"],
        properties: {
            name: "string",
            avatar: "string",
            bio: "string",
        }
    }
});

const projects = new mongoose.Schema({
    title: {
        type: "String",
        description: "Project Title"
    },
    description: {
        type: "String",
        description: "Explanation Of project"
    },
    startDate: {
        type: "date"
    },
    endDate: {
        type: "date"
    },
    status: {
        enum: ["Research", "On-going", "Completed"]
    }
});

const batches = new mongoose.Schema({
    name: {
        type: "String"
    },
    active: "boolean"
});

const tasks = {
    title: {
        type: "String"
    },
    description: {
        type: "String"
    },
    assignedBy : "string"
}

const reviews = {
    title: {
        type: "String"
    },
    description: {
        type: "String"
    },
    date: {
        type: "date"
    }
}

module.exports = {
    Users: mongoose.model("Users",userSchema),
    Projects: mongoose.model("Projects", projects),
    Roles: mongoose.model("Roles", roles),
    Batches: mongoose.model("Batches", batches),
    Tasks: mongoose.model("Tasks",tasks),
    Reviews: mongoose.model("Reviews",reviews),
    Students: mongoose.model("Students", student),
    Staffs: mongoose.model("Staffs", staffs)
}