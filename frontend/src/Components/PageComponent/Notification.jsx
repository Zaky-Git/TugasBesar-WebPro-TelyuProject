import React, { useState, useEffect, useRef } from "react";
import { IoMdNotifications } from "react-icons/io";
import { FaDotCircle } from "react-icons/fa";

import InfiniteScroll from "react-infinite-scroll-component";

const options = [

];

const notificationElements = [
  
];

const Notification = () => {
  const [notifActive, setNotifActive] = useState(false);
  const [notifState, setNotifState] = useState("ALL");
  const [notifications, setNotifications] = useState(
    notificationElements.slice(0, 5)
  );
  const notificationRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        notifActive
      ) {
        setNotifActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifActive]);

  const handleLogoClick = (event) => {
    event.stopPropagation();
    if (notifActive) {
      setNotifActive(false);
    } else {
      setNotifActive(true);
    }
  };

  const fetchMoreData = () => {
    if (notifications.length >= notificationElements.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.concat(
          notificationElements.slice(
            prevNotifications.length,
            prevNotifications.length + 5
          )
        )
      );
    }, 1500);
  };

  return (
    <div className="hidden md:block" ref={notificationRef}>
      <div
        style={{ userSelect: "none" }}
        className={`w-16 h-16 ${
          notifActive ? "bg-primary" : "bg-black hover:bg-gray-600 "
        }  fixed flex justify-center md:right-10 right-0 z-20 top-10 rounded-full cursor-pointer`}
        onClick={handleLogoClick}
      >
        <IoMdNotifications
          className={`h-full w-full p-4 my-auto  text-white transition  active:scale-90`}
        />
        <div className="absolute right-3 top-2 bg-primary rounded-full h-5 w-5 flex justify-center">
          <div className="my-auto text-xs text-white font-medium">{notificationElements.length}</div>
        </div>
      </div>
      <div
        hidden={!notifActive}
        className={
          "fixed w-auto md:w-[450px] rounded-lg py-4 bg-white md:right-28  left-10 right-10 z-10 md:left-auto top-10  border-2 scroll-smooth "
        }
        style={{ userSelect: "none" }}
      >
        <h1 className="px-5 text-xl sm:text-2xl text-black font-bold ">
          Notification
        </h1>
        <div className="md:w-full text-xs sm:text-base sm:px-5 pt-2 flex gap-2 overflow-x-auto w-4/5 mx-auto pb-2 sm:pb-0 ">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => setNotifState(option.value)}
              className={`sm:px-3 px-2 py-2 my-auto cursor-pointer ${
                notifState === option.value
                  ? "text-white bg-primaryAlternative hover:bg-red-500"
                  : "text-black hover:bg-grey"
              } font-bold active:scale-95 rounded-full`}
            >
              {option.label}
            </div>
          ))}
        </div>

        <InfiniteScroll
          dataLength={notifications.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more notifications</p>}
          className="w-auto my-auto p-5 text-base flex flex-col gap-2 max-h-[80vh] overflow-y-auto"
        >
          {notificationElements.map((notification) => (
              <div
                key={notification.id}
                className="bg-white group h-auto hover:bg-primaryAlternative border-2 rounded-lg active:scale-95 transition w-full md:w-96 p-2 flex flex-row gap-2 cursor-pointer"
              >
                <div
                  className={`my-auto bg-white border-2 rounded-full ${notification.dotColor}`}
                >
                  <FaDotCircle className="text-lg" />
                </div>
                <div className="w-auto">
                  <label
                    htmlFor=""
                    className="font-medium cursor-pointer text-black group-hover:text-white max-h-20 overflow-y-auto"
                  >
                    <span className="font-bold">{notification.title}</span> -{" "}
                    {notification.status}
                  </label>
                </div>
              </div>
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Notification;
