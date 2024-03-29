import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useToDoTasks from "../../hooks/useToDoTasks";
import useOnGoingTasks from "../../hooks/useOnGoingTasks";
import useCompleteTasks from "../../hooks/useCompleteTasks";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePersonalTasks from "../../hooks/usePersonalTasks";

const Dashboard = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const [toDoTasks, refetchToDo] = useToDoTasks();
    const [onGoingTasks, refetchOnGoing] = useOnGoingTasks();
    const [completedTasks, refetchCompleted] = useCompleteTasks();
    const [personalTasks, refetchPersonalTasks] = usePersonalTasks();
    console.log(personalTasks);
    console.log(user);
    const handleNewTask = (data) => {
        // document.getElementById('New_task_modal').showModal()
        console.log(data);
        const newTask = {
            title: data?.title,
            description: data?.description,
            email: user?.email,
            deadline: data?.deadline,
            priority: data?.priority
        }

        axiosSecure.post("/newTask", newTask)
            .then(res => {
                console.log(res.data);
                if (res?.data?.insertedId) {
                    toast("Your New Task Added!")
                    reset()
                    refetchPersonalTasks()
                }
            })
    }


    const handleToDoDelete = (data) => {
        console.log(data);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/toDo/${data?._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data?.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your task has been deleted.",
                                icon: "success"
                            });
                            refetchToDo()
                        }
                    })
            }
        });

    }
    const handleOnGoingDelete = (data) => {
        console.log(data);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/onGoing/${data?._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data?.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetchOnGoing()
                        }
                    })
            }
        });
    }
    const handleCompleteDelete = (data) => {
        console.log(data);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/complete/${data?._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data?.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetchCompleted()
                        }
                    })
            }
        });
    }
    const handleNewTaskDelete = (data) => {
        console.log(data);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/newTask/${data?._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data?.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your task has been deleted.",
                                icon: "success"
                            });
                            refetchPersonalTasks()
                        }
                    })
            }
        });

    }

    const [toDoId, setToDoId] = useState('')
    const [onGoingId, setOnGoingId] = useState('')
    const [completeId, setCompleteId] = useState('')
    const [personalId, setPersonalId] = useState('')

    const handleNewTaskModal = (data) => {
        console.log(data);
        setPersonalId(data._id)
        document.getElementById('new_task_update_modal').showModal()

    }

    const handleToDoModal = (data) => {
        console.log(data);
        setToDoId(data._id)
        const modal = document.getElementById('to_do_update_modal');
        modal.querySelector('textarea').value = data?.task;
        console.log('type of id', typeof (data._id));
        modal.showModal();
    }
    const handleOnGoingModal = (data) => {
        setOnGoingId(data._id)
        console.log(data);
        const modal = document.getElementById('onGoing_update_modal');
        modal.querySelector('textarea').value = data?.task;
        modal.showModal();
    }
    const handleCompleteModal = (data) => {
        setCompleteId(data._id)
        console.log(data);
        const modal = document.getElementById('complete_update_modal');
        modal.querySelector('textarea').value = data?.task;
        modal.showModal();
    }

    const handleNewTaskUpdate = (data) => {
        console.log(data);
        axiosSecure.patch(`/newTask/${personalId}`, data)
            .then(res => {
                console.log(res.data);
                toast("Your New Task Updated!")
                refetchPersonalTasks()
            })
    }

    const handleToDoUpdate = (data) => {
        console.log(data);
        console.log('toDoId', typeof (toDoId));
        axiosSecure.patch(`/toDo/${toDoId}`, data)
            .then(res => {
                console.log(res.data);
                toast("Your To Do Task Updated!")
                refetchToDo()
            })
    }
    const handleOnGoingUpdate = (data) => {
        console.log(data);
        axiosSecure.patch(`/onGoing/${onGoingId}`, data)
            .then(res => {
                console.log(res.data);
                toast("Your ongoing Task Updated!")
                refetchOnGoing()
            })
    }
    const handleCompleteUpdate = (data) => {
        console.log(data);
        axiosSecure.patch(`/complete/${completeId}`, data)
            .then(res => {
                console.log(res.data);
                toast("Your Completed Task Updated!")
                refetchCompleted()
            })
    }

    useEffect(() => {
        refetchToDo()
        refetchOnGoing()
        refetchCompleted()
    }, [refetchToDo, refetchOnGoing, refetchCompleted])
    return (
        <div className="px-5 md:px-5 lg:px-0">
            <div className=" my-5">
                <div className=" w-full flex justify-center items-center space-y-2 flex-col h-[150px]">
                    <div>
                        <img src={user?.photoURL} alt="" />
                    </div>
                    <p>{user?.displayName}</p>
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">Tasks</h1>
                    <div className="my-5 min-h-[300px]">
                        {
                            personalTasks.length > 0 ? personalTasks?.map((personalTask) => <div key={personalTask._id} className="flex justify-between items-center space-y-2 bg-[#f3b034]   min-h-[60px] text-black my-1 px-2 py-1"> <div><p>Title: {personalTask.title}</p> <p> Task: {personalTask.description}</p></div> <div className="flex justify-between items-center"><span onClick={() => handleNewTaskModal(personalTask)} className="mr-2 cursor-pointer"> <FaEdit></FaEdit> </span><span onClick={() => handleNewTaskDelete(personalTask)} className=" text-2xl cursor-pointer"><MdDelete></MdDelete></span></div> </div>) : <h1 className="text-3xl font-medium text-center text-red-500">There is no task available</h1>
                        }
                    </div>
                    <div>
                        <button onClick={() => document.getElementById('New_task_modal').showModal()} className="bg-[#6a994e] w-full font-semibold py-1 rounded-sm">Add New Task</button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 mt-10 space-y-5 md:space-y-5 lg:space-y-0">
                <div className="bg-[#6a994e] py-5 px-3">
                    <h1 className="text-2xl font-semibold text-center space-y-3">To-Do List</h1>
                    <div className="my-5 min-h-[300px]">
                        {
                            toDoTasks.length > 0 ? toDoTasks?.map((toDoTask) => <div key={toDoTask._id} className="flex justify-between items-center space-y-2 bg-[#f3b034]  min-h-[60px] text-black my-1 px-2 py-1"> <div><p>Title: {toDoTask.title}</p> <p> Task: {toDoTask.description}</p></div> <div className="flex justify-between items-center"><span onClick={() => handleToDoModal(toDoTask)} className="mr-2 cursor-pointer"> <FaEdit></FaEdit> </span><span onClick={() => handleToDoDelete(toDoTask)} className=" text-2xl cursor-pointer"><MdDelete></MdDelete></span></div> </div>) : <h1 className="text-2xl font-medium text-center text-red-500">There is no task available</h1>
                        }
                    </div>
                </div>
                <div className="bg-[#6a994e] py-5 px-3">
                    <h1 className="text-center text-2xl font-semibold">Ongoing List</h1>
                    <div className="my-5 min-h-[300px]">
                        {
                            onGoingTasks?.map((onGoingTask) => <div key={onGoingTask._id} className="flex justify-between items-center space-y-2 bg-[#f3b034]  min-h-[60px] text-black my-1 px-2 py-1"> <p>{onGoingTask.task}</p> <div className="flex justify-between items-center"><span onClick={() => handleOnGoingModal(onGoingTask)} className="mr-2 cursor-pointer"> <FaEdit></FaEdit> </span><span onClick={() => handleOnGoingDelete(onGoingTask)} className=" text-2xl cursor-pointer"><MdDelete></MdDelete></span></div></div>)
                        }
                    </div>
                </div>
                <div className="bg-[#6a994e] py-5 px-3">
                    <h1 className="text-center text-2xl font-semibold">Completed List</h1>
                    <div className="my-5 min-h-[300px]">
                        {
                            completedTasks?.map((completedTask) => <div key={completedTask._id} className="flex justify-between items-center space-y-2 bg-[#f3b034]  text-black my-1 px-2 py-1 min-h-[60px]"> <p> {completedTask.task}</p><div className="flex justify-between items-center"><span onClick={() => handleCompleteModal(completedTask)} className="mr-2 cursor-pointer"> <FaEdit></FaEdit> </span><span onClick={() => handleCompleteDelete(completedTask)} className=" text-2xl cursor-pointer"><MdDelete></MdDelete></span></div></div>)
                        }
                    </div>
                </div>
            </div>
            {/* New task modal here  */}
            <dialog id="New_task_modal" className="modal bg-[#385229]">
                <div className="modal-box text-black bg-gray-400">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(handleNewTask)} className="mx-4">
                        <p>
                            <input type='text' className='w-full my-4 px-3 py-1' placeholder='Title' {...register('title', { required: true })} />
                        </p>
                        <p>
                            <input type='text' className='w-full my-4 px-3 py-1' placeholder='Description' {...register('description', { required: true })} />
                        </p>
                        <p>
                            <input type='date' className='w-full my-4 px-3 py-1' placeholder='Deadline' {...register('deadline', { required: true })} />
                        </p>
                        <p>
                            <input type='text' className='w-full my-4 px-3 py-1' placeholder='low/moderate/high' {...register('priority', { required: true })} />
                        </p>
                        <div className=" flex justify-center">
                            <input type="submit" className="bg-[#6a994e] px-4 font-semibold text-white py-[2px]" />
                        </div>
                    </form>
                </div>
            </dialog>

            {/* update modal here  */}

            {/* New task modal here  */}
            <dialog id="new_task_update_modal" className="modal bg-[#385229]">
                <div className="modal-box text-black bg-gray-400">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(handleNewTaskUpdate)} className=" mx-4">
                        <p>
                            <input type='text' className='w-full my-4 px-3 py-1' placeholder='Title' {...register('title', { required: true })} />
                        </p>
                        <p>
                            <input type='text' className='w-full my-4 px-3 py-1' placeholder='Description' {...register('description', { required: true })} />
                        </p>
                        <p>
                            <input type='date' className='w-full my-4 px-3 py-1' placeholder='Deadline' {...register('deadline', { required: true })} />
                        </p>
                        <p>
                            <input type='text' className='w-full my-4 px-3 py-1' placeholder='low/moderate/high' {...register('priority', { required: true })} />
                        </p>
                        <div className=" flex justify-center">
                            <input type="submit" className="bg-[#6a994e] px-4 font-semibold text-white py-[2px]" />
                        </div>
                    </form>
                </div>
            </dialog>

            {/* to do task modal here  */}
            <dialog id="to_do_update_modal" className="modal bg-[#385229]">
                <div className="modal-box text-black">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(handleToDoUpdate)} className=" mx-4">
                        <textarea className="w-full p-2 " {...register("toDoUpdateTask")} />
                        <div className=" flex justify-center">
                            <input type="submit" className="bg-[#6a994e] px-4 font-semibold text-white py-[2px]" />
                        </div>
                    </form>
                </div>
            </dialog>
            {/* Ongoing task modal here  */}
            <dialog id="onGoing_update_modal" className="modal bg-[#385229]">
                <div className="modal-box text-black">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(handleOnGoingUpdate)} className=" mx-4">
                        <textarea className="w-full p-2 " {...register("onGoingUpdateTask")} />
                        <div className=" flex justify-center">
                            <input type="submit" className="bg-[#6a994e] px-4 font-semibold text-white py-[2px]" />
                        </div>
                    </form>
                </div>
            </dialog>
            {/* complete task modal here  */}
            <dialog id="complete_update_modal" className="modal bg-[#385229]">
                <div className="modal-box text-black">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(handleCompleteUpdate)} className=" mx-4">
                        <textarea className="w-full p-2 " {...register("completeUpdateTask")} />
                        <div className=" flex justify-center">
                            <input type="submit" className="bg-[#6a994e] px-4 font-semibold text-white py-[2px]" />
                        </div>
                    </form>
                </div>
            </dialog>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;