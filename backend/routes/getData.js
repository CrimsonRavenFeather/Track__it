const { userWorkoutData } = require('../schema');

const getData = async (req, res) => {
    try {
        console.log(req.body)
        const date = req.body.date;
        const email = req.body.email;
        const workoutData = await userWorkoutData.findOne({
            email: email,
            date: date
        });

        if (!workoutData) {
            // If no workout data is found, send a response and return early
            return res.status(404).json({ msg: "There is no data for this day" });
        }

        // If workout data is found, send it as a response
        res.json({ data: workoutData });
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getData };
