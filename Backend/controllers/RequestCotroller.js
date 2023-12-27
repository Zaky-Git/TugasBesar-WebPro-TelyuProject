import Faculty from "../models/FacultyModel.js";
import Request from "../models/RequestModel.js";
import Project from "../models/ProjectModel.js";
import User from "../models/UserModel.js";
import skill from "../models/SkillModel.js";
import ProjectSkillModel from "../models/ProjectModel.js";
import Role from "../models/RoleModel.js";
import ProjectMember from "../models/ProjectMemberModel.js";

export const createRequest = async (req, res) => {
  try {
    const { userID, projectID, roleID, message } = req.body;

    const existingRequest = await Request.findOne({
      where: {
        userID,
        projectID,
        status: "pending",
      },
    });


    if (existingRequest) {
      return res
        .status(400)
        .json({ msg: "Request already exists for this project and role." });
    }

    const cvPath = req.file.path;

    const newRequest = await Request.create({
      userID,
      projectID,
      roleID,
      message,
      cv: cvPath,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const RequestByProjectID = async (req, res) => {
  try {
    const response = await Project.findAll({
      where: {
        projectID: req.params.as,
      },
      include: [
        {
          model: Request,
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
      ],
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getMyProjectRequestMember = async (req, res) => {
  try {
    const response = await Project.findAll({
      where: {
        projectOwnerID: req.params.as,
      },

      include: [
        {
          model: Request,
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName", "photoProfileUrl"],
            },
            {
              model: Role,
              attributes: ["name"],
            },
          ],
        },
      ],

      // include: {
      //   model: Request,
      // },,
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const existingRequest = async (req, res) => {
  try {
    const { userID, projectID } = req.params;
    
    const existingRequest = await Request.findOne({
      where: {
        userID,
        projectID,
        status: "pending",
      },
    });

    res.json({ isRequested: !!existingRequest });
  } catch (error) {
    console.error("Error checking request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};