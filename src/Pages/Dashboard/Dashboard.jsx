import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useToDoTasks from "../../hooks/useToDoTasks";
import useOnGoingTasks from "../../hooks/useOnGoingTasks";
import useCompleteTasks from "../../hooks/useCompleteTasks";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Dashboard = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const [toDoTasks, refetchToDo] = useToDoTasks();
    const [onGoingTasks, refetchOnGoing] = useOnGoingTasks();
    const [completedTasks, refetchCompleted] = useCompleteTasks();
    const handleToDoTask = (data) => {
        document.getElementById('to_do_task_modal').showModal()
        const newToDo = {
            task: data?.toDoTask,
            email: user?.email
        }
        if (newToDo?.task) {
            axiosSecure.post("/toDo", newToDo)
                .then(res => {
                    console.log(res.data);
                    if (res?.data?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your To Do task added successfully!",
                            showConfirmButton: false,
                            timer: 1000
                        });
                        reset()
                        refetchToDo()
                    }
                })
        }
    }
    const handleOnGoingTask = (data) => {
        document.getElementById('ongoing_task_modal').showModal()
        console.log(data);
        const newOnGoing = {
            task: data?.onGoingTask,
            email: user?.email
        }
        if (newOnGoing?.task) {
            axiosSecure.post("/onGoing", newOnGoing)
                .then(res => {
                    console.log(res.data);
                    if (res?.data?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your Ongoing task added successfully!",
                            showConfirmButton: false,
                            timer: 1000
                        });
                        reset()
                        refetchOnGoing()
                    }
                })
        }
        reset()
    }
    const handleCompletedTask = (data) => {
        document.getElementById('complete_task_modal').showModal()
        console.log(data);
        const newCompleteTask = {
            task: data?.completeTask,
            email: user?.email
        }
        if (newCompleteTask?.task) {
            axiosSecure.post("/complete", newCompleteTask)
                .then(res => {
                    console.log(res.data);
                    if (res?.data?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your To Do task added successfully!",
                            showConfirmButton: false,
                            timer: 1000
                        });
                        reset()
                        refetchCompleted()
                    }
                })
        }
        reset()
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

    const handleToDoUpdate = (data) => {
        console.log(data);
            // Assuming you have a reference to the modal element
    const modal = document.getElementById('to_do_update_modal');

    // Set the default value for the textarea
    modal.querySelector('textarea').value = data?.task;

    // Show the modal
    modal.showModal();
        // axiosSecure.patch(`/toDo/${data?._id}`)
        // .then(res => {
        //     console.log(res.data);
        // })
    }
    const handleOnGoingUpdate = (data) => {
        console.log(data);
    }
    const handleCompleteUpdate = (data) => {
        console.log(data);
    }

    useEffect(() => {
        refetchToDo()
        refetchOnGoing()
        refetchCompleted()
    }, [refetchToDo, refetchOnGoing, refetchCompleted])
    return (
        <div className="px-5 md:px-5 lg:px-0">
            <div className="flex justify-start my-5">
                <Link to="/Profile"><h1 className="text-2xl font-semibold">Profile</h1></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 mt-10 space-y-5 md:space-y-5 lg:space-y-0">
                <div>
                    <h1 className="text-2xl font-semibold text-center space-y-3">To-Do List</h1>
                    <div className="my-5 min-h-[300px]">
                        {
                            toDoTasks?.map((toDoTask) => <div key={toDoTask._id} className="flex justify-between items-center space-y-2 bg-[#ffbe0b] min-h-[60px] text-black my-1 px-2 py-1"> <p> {toDoTask.task}</p> <div className="flex justify-between items-center"><span onClick={() => handleToDoUpdate(toDoTask)} className="mr-2 cursor-pointer"> <FaEdit></FaEdit> </span><span onClick={() => handleToDoDelete(toDoTask)} className="text-red-500 text-2xl cursor-pointer"><MdDelete></MdDelete></span></div> </div>)
                        }
                    </div>
                    <div>
                        <button onClick={handleToDoTask} className="bg-[#6a994e] w-full font-semibold py-1 rounded-sm">Add New Task</button>
                    </div>
                </div>
                <div>
                    <h1 className="text-center text-2xl font-semibold">Ongoing List</h1>
                    <div className="my-5 min-h-[300px]">
                        {
                            onGoingTasks?.map((onGoingTask) => <div key={onGoingTask._id} className="flex justify-between items-center space-y-2 bg-[#ffbe0b] min-h-[60px] text-black my-1 px-2 py-1"> <p>{onGoingTask.task}</p> <div className="flex justify-between items-center"><span onClick={() => handleOnGoingUpdate(onGoingTask)} className="mr-2 cursor-pointer"> <FaEdit></FaEdit> </span><span onClick={() => handleOnGoingDelete(onGoingTask)} className="text-red-500 text-2xl cursor-pointer"><MdDelete></MdDelete></span></div></div>)
                        }
                    </div>
                    <div>
                        <button onClick={handleOnGoingTask} className="bg-[#6a994e] w-full font-semibold py-1 rounded-sm">Add New Task</button>
                    </div>
                </div>
                <div>
                    <h1 className="text-center text-2xl font-semibold">Completed List</h1>
                    <div className="my-5 min-h-[300px]">
                        {
                            completedTasks?.map((completedTask) => <div key={completedTask._id} className="flex justify-between items-center space-y-2 bg-[#ffbe0b] text-black my-1 px-2 py-1 min-h-[60px]"> <p> {completedTask.task}</p><div className="flex justify-between items-center"><span onClick={() => handleCompleteUpdate(completedTask)} className="mr-2 cursor-pointer"> <FaEdit></FaEdit> </span><span onClick={() => handleCompleteDelete(completedTask)} className="text-red-500 text-2xl cursor-pointer"><MdDelete></MdDelete></span></div></div>)
                        }
                    </div>
                    <div>
                        <button onClick={handleCompletedTask} className="bg-[#6a994e] w-full font-semibold py-1 rounded-sm">Add New Task</button>
                    </div>
                </div>
            </div>
            {/* to do task modal here  */}
            <dialog id="to_do_task_modal" className="modal bg-[#385229]">
                <div className="modal-box text-black">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(handleToDoTask)} className=" mx-4">
                        <textarea className="w-full p-2 " {...register("toDoTask")} placeholder="Write here your task ..." />
                        <div className=" flex justify-center">
                            <input type="submit" className="bg-[#6a994e] px-4 font-semibold text-white py-[2px]" />
                        </div>
                    </form>
                </div>
            </dialog>
            {/* on going task modal here  */}
            <dialog id="ongoing_task_modal" className="modal bg-[#385229]">
                <div className="modal-box text-black">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(handleOnGoingTask)} className=" mx-4">
                        <textarea className="w-full p-2 " {...register("onGoingTask")} placeholder="Write here your task ..." />
                        <div className=" flex justify-center">
                            <input type="submit" className="bg-[#6a994e] px-4 font-semibold text-white py-[2px]" />
                        </div>
                    </form>
                </div>
            </dialog>
            {/* complete task modal here  */}
            <dialog id="complete_task_modal" className="modal bg-[#385229]">
                <div className="modal-box text-black">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(handleCompletedTask)} className=" mx-4">
                        <textarea className="w-full p-2 " {...register("completeTask")} placeholder="Write here your task ..." />
                        <div className=" flex justify-center">
                            <input type="submit" className="bg-[#6a994e] px-4 font-semibold text-white py-[2px]" />
                        </div>
                    </form>
                </div>
            </dialog>


            {/* update modal here  */}
              {/* to do task modal here  */}
              <dialog id="to_do_update_modal" className="modal bg-[#385229]">
                <div className="modal-box text-black">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(handleToDoTask)} className=" mx-4">
                        <textarea  className="w-full p-2 " {...register("toDoTask")} />
                        <div className=" flex justify-center">
                            <input type="submit" className="bg-[#6a994e] px-4 font-semibold text-white py-[2px]" />
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Dashboard;