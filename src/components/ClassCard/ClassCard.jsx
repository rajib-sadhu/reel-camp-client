import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useEnrollCart from "../../hooks/useEnrollCart";

const ClassCard = ({ item }) => {

    const { user } = useAuth();
    const [enrollCart, , refetch] = useEnrollCart();
  

    const navigate = useNavigate();
    const location = useLocation();

    const existClass = enrollCart.find(c => c.classId === item._id);

    const handleEnroll = () => {
        if (user) {

            const enrollCart = {
                classId: item._id,
                className: item.className,
                instructorName: item.instructorName,
                image: item.image,
                price: item.price,
                email: user.email
            };



            if (!existClass) {
                fetch('http://localhost:5000/selectClasses', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(enrollCart)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        if (data.insertedId) {
                            Swal.fire({
                                title: 'Class add to enroll cart',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            refetch();
                        }
                    })
            }
            else{
                Swal.fire({
                    title: 'This class already added!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }


        }
        else {
            Swal.fire({
                title: 'Please login to enroll class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signIn', { state: { from: location } })
                }
            })
        }
    }


    return (
        <div className="card card-side bg-base-100 shadow-xl h-[18rem]">
            <figure><img className="object-cover w-[20rem] h-full" src={item?.image} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{item?.className}</h2>
                <p>
                    <p>Instructor: {item?.instructorName} </p>
                    <p>Price: ${item?.price} </p>
                    <p>Available Seats: {item?.availableSeats} </p>
                </p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleEnroll(item)} className="btn btn-primary">Add Enroll Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;