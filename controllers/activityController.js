import Chapter from "../models/chapterModel.js";
import Contact from "../models/contactModel.js";
import Question from "../models/questionModel.js";
import QuestionTemplate from "../models/questiontemplateModel.js";
import School from "../models/schoolModel.js";
import Standard from "../models/standarModel.js";
import Subject from "../models/subjectModel.js";

export const addschoolcontroller = async (req, res) => {
  req.body.userid = req.user.userid;
  const objectData = req.file
    ? { ...req.body, schoolimage: req.file.filename }
    : req.body;

  const school = await School.create(objectData);

  if (school) {
    return res.status(201).json({ msg: "School create Successfully" });
  } else {
    return res.status(400).json({ msg: "Failed To Create School" });
  }
};

export const contactform = async (req, res) => {
  const contact = await Contact.create(req.body);
  if (contact) {
    return res
      .status(201)
      .json({ msg: "Thank you for your detail we will contact you shortly" });
  } else {
    return res.status(400).json({ msg: "Failed To Send" });
  }
};

export const standardcontroller = async (req, res) => {
  req.body.userid = req.user.userid;
  const standard = await Standard.create(req.body);
  if (standard) {
    return res.status(201).json({ msg: "Standard Created Successfully" });
  } else {
    return res.status(400).json({ msg: "Failed To Create Standard" });
  }
};

export const getstandard = async (req, res) => {
  const standard = await Standard.find({}, { name: 1 });
  if (standard) {
    return res.status(200).json({ standard });
  } else {
    return res.status(400).json({ msg: "No Standard Found" });
  }
};

export const subjectcontroller = async (req, res) => {
  req.body.userid = req.user.userid;
  const subject = await Subject.create(req.body);
  if (subject) {
    return res.status(201).json({ msg: "Subject Created Successfully" });
  } else {
    return res.status(400).json({ msg: "Failed To Create Subject" });
  }
};

export const getsubject = async (req, res) => {
  const subject = await Subject.find({}, { name: 1 });
  const standard = await Standard.find({}, { name: 1 });
  if (subject && standard) {
    return res.status(200).json({ subject, standard });
  } else {
    return res.status(400).json({ msg: "No Subject Found" });
  }
};

export const getSubjectStandard = async (req, res) => {
  const subject = await Subject.find({ standard: req.params.id }, { name: 1 });
  if (subject) {
    return res.status(200).json({ subject });
  } else {
    return res.status(400).json({ msg: "No Subject Found" });
  }
};

export const getSubjectStandardChapter = async (req, res) => {
  const chapter = await Chapter.find(
    { standard: req.params.standard, subject: req.params.subject },
    { name: 1 }
  );
  if (chapter) {
    return res.status(200).json({ chapter });
  } else {
    return res.status(400).json({ msg: "No Chapter Found" });
  }
};

export const chaptercontroller = async (req, res) => {
  req.body.userid = req.user.userid;
  const chapter = await Chapter.create(req.body);
  if (chapter) {
    return res.status(201).json({ msg: "Chapter Created Successfully" });
  } else {
    return res.status(400).json({ msg: "Failed To Create Chapter" });
  }
};

export const getalldivision = async (req, res) => {
  const chapters = await Chapter.find({}, { name: 1 });
  const subjects = await Subject.find({}, { name: 1 });
  const standards = await Standard.find({}, { name: 1 });

  return res.status(200).json({ subjects, standards, chapters });
};

export const generatequestion = async (req, res) => {
  const question = await Question.create(req.body);
  if (question) {
    return res.status(200).json({ msg: "Question Generate Successfully" });
  } else {
    return res.status(400).json({ msg: "Failed to  Generate Question" });
  }
};

export const getquestions = async (req, res) => {
  // const { standard, subject, chapter, questiontype } = req.params;
  const { standard, subject, chapter, typeofquestion } = req.body;
  // const questions = await Question.find(
  //   {
  //     standard,
  //     subject,
  //     chapter,
  //     typeofquestion: questiontype,
  //   },
  //   { text: 1, options: 1 }
  // );
  const questions = await Question.find({
    $and: [
      { standard: standard },
      { subject: subject },
      { chapter: chapter },
      { typeofquestion: typeofquestion },
    ],
  });

  if (questions.length > 0) {
    return res.status(200).json({ questions });
  } else {
    return res.status(400).json({ msg: "No Quetion Found" });
  }
};

export const addquestiontemplate = async (req, res) => {
  const presentquestions = await Question.findOne({
    questionid: req.body.questionid,
    userid: req.user.userid,
  });
  if (presentquestions) {
    return res.status(400).json({ msg: "Question Already Added" });
  } else {
    req.body.userid = req.user.userid;
    const questiontemplate = await QuestionTemplate.create(req.body);
    if (questiontemplate) {
      return res.status(200).json({ msg: "Added Successfully" });
    } else {
      return res.status(400).json({ msg: "Failed to Add Quetion" });
    }
  }
};

export const createtemplates = async (req, res) => {
  const { questions } = req.body;
  req.body.userid = req.user.userid;

  if (questions.length > 0) {
    const questions = await QuestionTemplate.create(req.body);
    if (questions) {
      return res.status(200).json({ msg: "Templated Created Successfully" });
    } else {
      return res.status(400).json({ msg: "Failed To Generate Template" });
    }
  } else {
    return res.status(400).json({ msg: "Please Select Questions" });
  }
};

export const getuserschool = async (req, res) => {
  const schools = await School.find({ userid: req.user.userid });
  if (schools) {
    return res.status(200).json({ schools });
  } else {
    return res
      .status(400)
      .json({ msg: "Kindly Add School Detail under Account" });
  }
};

export const generatetemplate = async (req, res) => {
  // return res.status(200).json({ msg: "New Status" });
  const school = await School.findOne({ _id: req.body.school });

  const questions = await QuestionTemplate.find(
    { userid: req.user.userid },
    { questions: 1 }
  ).populate("questions");
  if (school && questions) {
    return res.status(200).json({ school, questions });
  } else {
    return res.status(400).json({ msg: "Failed To Load Data" });
  }
};
