import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTrashTaskMutation } from '../redux/slices/api/taskApiSlice.js';
import { toast } from 'sonner';
import Button from './Button.jsx';
import TaskColor from './task/TaskColor.jsx';
import { formatDate, TASK_TYPE, PRIORITYSTYLES } from '../utils';
import TaskAssets from './task/TaskAssets.jsx';
import clsx from 'clsx';
import ConfirmationDialog from './ConfirmationDialog.jsx';
import AddTask from './task/AddTask.jsx';

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  normal: <MdKeyboardArrowDown />,
  low: <MdKeyboardArrowDown />,
};


const Table = ({ tasks = [] }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [deleteTask] = useTrashTaskMutation();

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClickHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteTask({
        id: selected,
        isTrashed: "trash",
      }).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const TableHeader = () => (
    <thead className='w-full border-b border-[#334155]'>
      <tr className='w-full text-white text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2 line-clamp-1'>Created At</th>
        <th className='py-2'>Assets</th>
        <th className='py-2'>Team</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-[#334155] text-[#94a3b8] hover:bg-[#334155]/10'>
      <td className='py-2'>
        <Link to={`/task/${task._id}`}>
          <div className='flex items-center gap-2'>
            <TaskColor className={TASK_TYPE[task.stage]} />
            <p className='w-full line-clamp-2 text-base text-white'>
              {task?.title}
            </p>
          </div>
        </Link>
      </td>

      <td className='py-2'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIORITYSTYLES[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className='capitalize line-clamp-1 text-white'>
            {task?.priority} Priority
          </span>
        </div>
      </td>

      <td className='py-2'>
        <span className='text-sm text-[#94a3b8]'>
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className='py-2'>
        <TaskAssets
          activities={task?.activities?.length}
          subTasks={task?.subTasks}
          assets={task?.assets?.length}
        />
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
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

      <td className='py-2 flex gap-2 md:gap-4 justify-end'>
        <Button
          className='text-[#3b82f6] hover:text-[#2563eb] sm:px-0 text-sm md:text-base'
          label='Edit'
          type='button'
          onClick={() => editClickHandler(task)}
        />

        <Button
          className='text-red-500 hover:text-red-400 sm:px-0 text-sm md:text-base'
          label='Delete'
          type='button'
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );

   return (
    <>
      <div className='bg-[#1e293b] border border-[#334155] px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full '>
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />
    </>
  );
}

export default Table