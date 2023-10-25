import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Imgbg from "../img/consul2.png";

const CreateProject = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [groupChatLink, setGroupChatLink] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [faculty, setFaculty] = useState("Informatika");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting form data
    console.log({
        projectTitle,
        groupChatLink,
        description,
        maxMembers,
        faculty,
        startDate,
        endDate
    });
  };

  return (
    <div
      className="flex justify-center w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Imgbg})` }}
    >
      <div className="columns w-2/3  flex justify-center flex-col">
        <h1 className="text-center mt-4 text-xl xs:text-lg sm:text-2xl md:text-4xl md:my-4 font-bold">
          Create Project
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5 flex-row pt-6 w-full justify-center">
            <div className="w-full">
              <label className="font-medium text-xs text-textGray md:text-base after:content-['*'] after:ml-0.5 after:text-red-500 block">
                Project Title
              </label>
              <div className="">
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="p-1 sm:p-2 text-xs h-full w-full md:text-base focus:outline-black border-textGray border-[0.5px] md:border-[1px] border-solid rounded-md md:rounded-lg"
                  placeholder="Project Name"
                />
              </div>
            </div>

            <div className="w-full">
              <label className="font-medium text-xs text-textGray md:text-base after:content-['*'] after:ml-0.5 after:text-red-500 block">
                Group Chat Link
              </label>
              <div className="">
                <input
                  type="text"
                  value={groupChatLink}
                  onChange={(e) => setGroupChatLink(e.target.value)}
                  className="p-1 sm:p-2 text-xs h-full w-full md:text-base focus:outline-black border-textGray border-[0.5px] md:border-[1px] border-solid rounded-md md:rounded-lg"
                  placeholder="http://www.example.com"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-5 flex-row pt-6 w-full justify-center">
            <div className="w-full">
              <label className="font-medium text-xs text-textGray md:text-base after:content-['*'] after:ml-0.5 after:text-red-500 block">
                Description
              </label>
              <div className="lb">
                <textarea
                  rows="4"
                  name="desc"
                  id="desc"
                  placeholder="Write your project description here"
                  className="p-1 sm:p-2 text-xs h-full w-full  md:text-base focus:outline-black border-textGray border-[0.5px] md:border-[1px] border-solid rounded-md md:rounded-lg"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="w-full">
              <label className="font-medium text-xs text-textGray md:text-base after:content-['*'] after:ml-0.5 after:text-red-500 block ">
                Maximum Member
              </label>
              <div className="control">
                <input
                  type="number"
                  className="p-1 sm:p-2 text-xs h-full w-full md:text-base focus:outline-black border-textGray border-[0.5px] md:border-[1px] border-solid rounded-md md:rounded-lg"
                  placeholder="0"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-5 flex-row pt-6 w-full justify-center">
            <div className="w-1/2">
              <label
                className="font-medium text-xs text-textGray md:text-base after:content-['*'] after:ml-0.5 after:text-red-500 block"
                htmlFor=""
              >
                Faculty
              </label>
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="p-1 sm:p-2 text-xs w-full md:text-base focus:outline-black border-textGray border-[0.5px] md:border-[1px] border-solid rounded-md md:rounded-lg"
                name=""
                id=""
              >
                <option>Informatika</option>
                <option>Industri Kreatif</option>
                <option>Teknik Elektro</option>
              </select>
            </div>

            <div className="flex flex-row justify-between w-1/2">
              <div className="">
                <label className="font-medium text-xs text-textGray md:text-base after:content-['*'] after:ml-0.5 after:text-red-500 block">
                  Project Start
                </label>
                <div className="">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="p-1 sm:p-2 text-xs h-full w-full md:text-base focus:outline-black border-textGray border-[0.5px] md:border-[1px] border-solid rounded-md md:rounded-lg"
                    placeholderText="Set Date"
                  />
                </div>
              </div>

              <div className="">
                <label className="font-medium text-xs text-textGray md:text-base after:content-['*'] after:ml-0.5 after:text-red-500 block">
                  Project End
                </label>
                <div className="">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="p-1 sm:p-2 text-xs h-full w-full md:text-base focus:outline-black border-textGray border-[0.5px] md:border-[1px] border-solid rounded-md md:rounded-lg"
                    placeholderText="Set Date"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-10 pt-0 xs:pt-2">
            <button
              type="submit"
              className="text-secondary bg-primary w-1/4 py-1 cursor-pointer block sm:py-3 md:text-lg text-xs px-2 md:px-5 rounded-md md:rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
