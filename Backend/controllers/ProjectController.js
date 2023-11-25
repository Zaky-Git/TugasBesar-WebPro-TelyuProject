import Project from "../models/ProjectModel.js";
import ProjectRole from "../models/ProjectRoleModel.js";
import Role from "../models/RoleModel.js";
import User from "../models/UserModel.js";
import ProjectSkill from "../models/ProjectSkillModel.js";
import Skill from "../models/SkillModel.js";
import ProjectMember from "../models/ProjectMemberModel.js";
import { literal } from "sequelize";

export const getNewestProjects = async (req, res) => {
  try {
    const newestProjects = await Project.findAll({
      limit: 3,
      order: [["projectID", "ASC"]],
      include: [
        {
          model: User,
          as: "projectOwner",
          attributes: ["userID", "firstName", "lastName", "email"],
        },
        {
          model: ProjectRole,
          attributes: ["roleID"],
          include: [
            {
              model: Role,
              attributes: ["name"],
            },
            {
              model: ProjectMember,
              attributes: ["userID"],
              include: {
                model: User,
                attributes: ["firstName", "lastName", "email"],
              },
            },
          ],
        },
        {
          model: ProjectSkill,
          attributes: ["skillID"],
          include: {
            model: Skill,
            attributes: ["name"],
          },
        },
        {
          model: ProjectMember,
          attributes: ["userID"],
          include: {
            model: User,
            attributes: ["firstName", "lastName", "email"],
          },
        },
      ],
      attributes: {
        include: [
          [
            literal(`(
              SELECT COUNT(*)
              FROM projectMember
              WHERE ProjectMember.projectID = Project.projectID
            )`),
            "projectMemberCount",
          ],
        ],
      },
    });

    res.status(200).json(newestProjects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch newest projects", error });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["projectID", "DESC"]],
      include: {
        model: User,
        as: "projectOwner",
        attributes: ["firstName", "lastName"],
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error });
  }
};
