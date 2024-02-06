const Travel = require('../module/travel')

exports.deleteTravel = async(req, res, next) => {
    try {
        await Travel.findByIdAndDelete(req.params.id)
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json(err)
    }
}

exports.deleteComments= async (req, res, next) => {
 const { commentId } = req.params;

  try {
   
    const travel = await Travel.findOneAndUpdate(
      { 'comments._id': commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!travel) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.singleTravel = async(req, res, next) => {
    try {
      const travel =   await Travel.findById(req.params.id)
      res.status(200).json(travel);
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.allTravel = async(req, res, next) => {
    try {
        const travel = await Travel.find()

        res.status(200).json(travel)
    } catch (error) {
        next(error)
    }
}

exports.addComment = async(req, res, next) => {
    const { travelId } = req.params;
    const { text, user, } = req.body;
    console.log('Received travelId:', travelId);
  try {
    const travel = await Travel.findById(travelId)
    if (!travel) {
        return res.status(404).json({ error: 'dont find' });
      }
      const newComment = {
        user: user,
        text: text,
      };


    travel.comments.push(newComment)
    await travel.save();

    return res.status(201).json(travel.comments);

  } catch (error) {
    console.error(error);
    console.log('cant add comment');
  }
}

exports.allComments = async( req, res, next) => {
    const { travelId } = req.params;

    try {
        const travels = await Travel.findById(travelId)
        if (!travels) {
            return res.status(404).json({ error: 'dont find' });
          }

        return res.status(200).json(travels.comments);
    } catch (error) {
        console.error(error);
        console.log('cant find');
    }
}