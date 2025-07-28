import clsx from "clsx";
import moment from "moment";
import React, { useEffect } from "react";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { LuClipboard } from "react-icons/lu";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { Chart, Loading, UserInfo } from "../components";
import { useGetDasboardStatsQuery } from "../redux/slices/api/taskApiSlice";
import { BGS, PRIORITYSTYLES, TASK_TYPE, getInitials } from "../utils";
import { useSelector } from "react-redux";

const Card = ({ label, count, bg, icon }) => {
  return (
    <div className='w-full h-32 bg-[#1e293b] p-5 shadow-md rounded-md flex items-center justify-between border border-[#334155]'>
      <div className='h-full flex flex-1 flex-col justify-between'>
        <p className='text-base text-white'>{label}</p>
        <span className='text-2xl font-semibold text-white'>{count}</span>
        <span className='text-sm text-[#94a3b8]'>{moment().format('MMMM YYYY')}</span>
      </div>
      <div
        className={clsx(
          "w-10 h-10 rounded-full flex items-center justify-center text-white",
          bg
        )}
      >
        {icon}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { data, isLoading, error } = useGetDasboardStatsQuery();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (isLoading)
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-blue-700",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: data?.tasks?.completed || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-green-600",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: data?.tasks?.inprogress || 0,
      icon: <LuClipboard />,
      bg: "bg-orange-600",
    },
    {
      _id: "4",
      label: "TODOS",
      total: data?.tasks?.todo || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-red-600",
    },
  ];

  return (
    <div className='h-full py-4'>
      <>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
          {stats?.map(({ icon, bg, label, total }, index) => (
            <Card key={index} icon={icon} bg={bg} label={label} count={total} />
          ))}
        </div>

        <div className='w-full bg-[#1e293b] my-16 p-4 rounded shadow-sm border border-[#334155]'>
          <h4 className='text-xl text-white font-bold mb-2'>
            Chart by Priority
          </h4>
          <Chart data={data?.graphData} />
        </div>
        <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
          {/* RECENT AUTHORS */}
          {data && <TaskTable tasks={data?.last10Task} />}
          {/* RECENT USERS */}
          {data && user?.isAdmin && <UserTable users={data?.users} />}
        </div>
      </>
    </div>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className='border-b border-[#334155]'>
      <tr className='text-white text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-[#334155] text-white hover:bg-[#334155]/20'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>
          <div>
            <p> {user.name}</p>
            <span className='text-xs text-[#94a3b8]'>{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm font-medium",
            user?.isActive ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className='w-full md:w-1/3 bg-[#1e293b] h-fit px-2 md:px-6 py-4 shadow-md rounded border border-[#334155]'>
      <table className='w-full mb-5'>
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TaskTable = ({ tasks }) => {
  const { user } = useSelector((state) => state.auth);

  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    normal: <MdKeyboardArrowDown />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className='border-b border-[#334155]'>
      <tr className='text-white text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Team</th>
        <th className='py-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-[#334155] text-white hover:bg-[#334155]/20'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className='text-base text-white'>
            {task?.title}
          </p>
        </div>
      </td>
      <td className='py-2'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIORITYSTYLES[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className='capitalize'>{task?.priority}</span>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task?.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className='py-2 hidden md:block'>
        <span className='text-base text-[#94a3b8]'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  return (
    <>
      <div
        className={clsx(
          "w-full bg-[#1e293b] px-2 md:px-4 pt-4 pb-4 shadow-md rounded border border-[#334155]",
          user?.isAdmin ? "md:w-2/3" : ""
        )}
      >
        <table className='w-full '>
          <TableHeader />
          <tbody className=''>
            {tasks?.map((task, id) => (
              <TableRow key={task?._id + id} task={task} />
            )) || []}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;