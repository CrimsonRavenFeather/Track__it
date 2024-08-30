const { userWorkoutData } = require('../schema')

const save = async (req, res) => {
    try {
        const date = req.body.date;
        const data = req.body.data;
        const email = req.body.email;
        if (!date) {
            return res.status(400).json({
                error: "Date is not selected"
            });
        }

        // Check if data already exists for the provided date
        const prevData = await userWorkoutData.findOne({
            email: email,
            date: date
        });

        if (prevData) {
            // Update existing data
            await userWorkoutData.updateOne(
                { _id: prevData._id },
                { $set: { data: data } }
            );
            return res.json({ msg: "Data is edited" });
        }

        // If no previous data exists, create a new entry
        const newData = new userWorkoutData({
            email: email,
            date: date,
            data: data
        });

        await newData.save();
        return res.json({ msg: "Data is saved" });

    } catch (error) {
        return res.json({ error: error.message });
    }
}

module.exports = { save };
