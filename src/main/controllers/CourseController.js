import CourseRepository from '../models/repositories/CourseRepository';
import logger from '../log';

/**
 * CourseController.js
 *
 * @description :: Server-side logic for managing Courses.
 */
const CourseController = {

    create(req, res) {
        logger.debug(JSON.stringify(req.body));
        CourseRepository.create(req.body)
            .then((newCourse) => {
                res.json(newCourse);
            }).catch((error) => {
            if (error.code == 11000) {
                logger.error(`${error.message}`);
                logger.error(`${error.stack}`);
                res.status(500).json({"msg": "Course already exist"});
            } else {
                logger.error(error);
                res.status(500).json('an error has occurred');
            }
        });
    },

    /**
     * CourseController.list()
     */
    list(req, res) {
        CourseRepository.find()
            .then((courses) => {
                res.json(courses);
            }).catch((error) => {
            res.status(500).json({
                message: 'Error when getting Courses.',
                error: error
            });
        });
    }
}

export default CourseController;