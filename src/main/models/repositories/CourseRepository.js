import Course from '../Course';

class CourseRepository {

    constructor(model) {
        this.model = model;
    }

    create(course) {
        return this.model.create(course);
    }

    find() {
        return this.model.find();
    }
}

export default new CourseRepository(Course);