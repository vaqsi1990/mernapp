const User = require('../module/User')
const Saved = require('../module/saved')
const Travel = require('../module/travel')

exports.savedItems = async(req, res, next) => {
    const userId = req.params.userId;
    try {
        let saved = await Saved.findOne({ user: userId })
        if (saved && saved.items.length > 0) {
            res.send(saved);
        } else {
            res.send(null);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
}

exports.addItem = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { cityId, name, location, photos } = req.body;

        console.log("Request Body:", req.body);

        const user = await User.findById(userId);
        const travel = await Travel.findById(cityId);

        

        let city = await Saved.findOne({ user: userId });

        if (!city) {
            city = new Saved({ user: userId, items: [] });
        }

        
        city.items.push({
            travels: cityId,  
            name: name,
            location: location,
            photos:photos
        });

        await city.save();

        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
