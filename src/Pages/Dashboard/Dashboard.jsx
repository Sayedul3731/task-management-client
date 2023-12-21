import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Dashboard = () => {
    const { register, handleSubmit, reset } = useForm();
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
  
    const handleToDoTask = (data) => {
        document.getElementById('to_do_task_modal').showModal()
        const newToDo = {
            task: data?.toDoTask,
            email: user?.email
        }
       if(newToDo?.task){
        axiosSecure.post("/toDo", newToDo)
        .then(res => {
            console.log(res.data);
            if(res?.data?.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your To Do task added successfully!",
                    showConfirmButton: false,
                    timer: 1000
                  });
                  reset()
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
       if(newOnGoing?.task){
        axiosSecure.post("/onGoing", newOnGoing)
        .then(res => {
            console.log(res.data);
            if(res?.data?.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Ongoing task added successfully!",
                    showConfirmButton: false,
                    timer: 1000
                  });
                  reset()
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
       if(newCompleteTask?.task){
        axiosSecure.post("/complete", newCompleteTask)
        .then(res => {
            console.log(res.data);
            if(res?.data?.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your To Do task added successfully!",
                    showConfirmButton: false,
                    timer: 1000
                  });
                  reset()
            }
        })
       }
        reset()
    }
    return (
        <div className="">
            <div className="flex justify-end">
                <Link to="/Profile"><h1 className="text-2xl font-semibold">Profile</h1></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5">
                <div>
                    <h1 className="text-center space-y-3">To-Do List</h1>
                    <p>Set up a new Git repository for Project X.</p>
                    <p className="my-2">Set up a new Git repository for Project X.</p>
                    <p>Set up a new Git repository for Project X.</p>
                    <p className="my-2">Set up a new Git repository for Project X.</p>
                    <div>
                        <button onClick={handleToDoTask} className="bg-[#6a994e] w-full font-semibold py-1 rounded-sm">Add New Task</button>
                    </div>
                </div>
                <div>
                    <h1 className="text-center">Ongoing List</h1>
                    <p>Debug and resolve issues in Module B.</p>
                    <p className="my-2">Debug and resolve issues in Module B.</p>
                    <p>Debug and resolve issues in Module B.</p>
                    <p className="my-2">Debug and resolve issues in Module B.</p>
                    <div>
                        <button onClick={handleOnGoingTask} className="bg-[#6a994e] w-full font-semibold py-1 rounded-sm">Add New Task</button>
                    </div>
                </div>
                <div>
                    <h1 className="text-center">Completed List</h1>
                    <p>Successfully integrated API for data retrieval.</p>
                    <p className="my-2">Successfully integrated API for data retrieval.</p>
                    <p>Successfully integrated API for data retrieval.</p>
                    <p className="my-2">Successfully integrated API for data retrieval.</p>
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
        </div>
    );
};

export default Dashboard;