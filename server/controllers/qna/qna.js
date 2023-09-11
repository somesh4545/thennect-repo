const QNA = require("../../models/qna");

const getQNAs = async (req, res) => {
  const { categories, sort, fields } = req.query;
  var queryObject = {};

  if (categories) {
    const categoriesList = categories.split(",");
    queryObject = { categories: { $in: categoriesList } };
  }

  let result = QNA.find(queryObject);

  // sorting features
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // selecting required fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const qnas = await result
    .populate("user", "firstName bgColor img_url _id")
    .skip(skip)
    .limit(limit);

  res.status(200).json({ data: JSON.stringify(qnas), count: qnas.length });
};

const addQNA = async (req, res) => {
  const { user, question, categories } = req.body;
  if (user && question && categories) {
    const newQNA = await QNA.create(req.body);
    res.status(201).json({ qnaID: newQNA._id.toString() });
  } else {
    res.status(404).json({ error: 404, msg: "ALl fields are required" });
  }
};

const getQNAByID = async (req, res) => {
  const { qnaID } = req.params;
  if (qnaID) {
    const qnaItem = await QNA.findOne({ _id: qnaID })
      .populate("user", "firstName bgColor img_url _id")
      .populate("comments.user", "firstName bgColor img_url _id");
    res.status(200).json({ data: qnaItem });
    // res.status(200).json({ data: JSON.stringify(qnaItem) });
  } else {
    res.status(404).json({ error: 404, msg: "QNA id is must" });
  }
};

const addCommentToQNA = async (req, res) => {
  const { qnaID } = req.params;
  if (qnaID) {
    await QNA.findByIdAndUpdate(qnaID, {
      $push: { comments: req.body },
      $inc: { commentsCount: 1 },
    });
    res.status(200).json({ data: "Inserted successfully" });
    // res.status(200).json({ data: JSON.stringify(qnaItem) });
  } else {
    res.status(404).json({ error: 404, msg: "QNA id is must" });
  }
};

module.exports = { getQNAs, addQNA, getQNAByID, addCommentToQNA };
