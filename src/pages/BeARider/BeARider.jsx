import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch, reset } = useForm();
  const serviceCenters = useLoaderData();
  const axiosSecure = useAxiosSecure();

  // --- Extract UNIQUE regions ---
  const uniqueRegions = [...new Set(serviceCenters.map((s) => s.region))];

  // watch the Region field 'riderRegion'
  const watchRegion = watch("riderRegion");

  // districts filtered based on selected region
  const filteredDistricts = watchRegion
    ? [
        ...new Set(
          serviceCenters
            .filter((item) => item.region === watchRegion)
            .map((i) => i.district)
        ),
      ]
    : [];

  const onSubmit = (data) => {
    // biker info to post to the database
    axiosSecure.post("/riders", data).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application has been submitted. Please wait patiently",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });

    // console.log("Rider Form Data:", RiderInfo);
    // reset();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow my-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Become a Rider</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Rider Name */}
        <div>
          <label className="font-semibold">Rider Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            {...register("riderName")}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Rider Email */}
        <div>
          <label className="font-semibold">Rider Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            {...register("riderEmail")}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Driving License */}
        <div>
          <label className="font-semibold">Driving License Number</label>
          <input
            type="text"
            placeholder="Enter your license number"
            {...register("drivingLicense", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* REGION DROPDOWN */}
        <div>
          <label className="font-semibold">Your Region</label>
          <select
            {...register("riderRegion", { required: true })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Region</option>

            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* DISTRICT DROPDOWN (DEPENDENT) */}
        <div>
          <label className="font-semibold">District</label>
          <select
            {...register("riderDistrict", { required: true })}
            disabled={!watchRegion}
            className="w-full border px-3 py-2 rounded disabled:bg-gray-200"
          >
            <option value="">Select District</option>

            {filteredDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* NID */}
        <div>
          <label className="font-semibold">NID No</label>
          <input
            type="text"
            placeholder="Enter your NID number"
            {...register("nid", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="font-semibold">Phone Number</label>
          <input
            type="text"
            placeholder="e.g. 017xxxxxxxx"
            {...register("phone", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Bike Model */}
        <div>
          <label className="font-semibold">Bike Brand, Model & Year</label>
          <input
            type="text"
            placeholder="e.g. Honda Livo 2021"
            {...register("bikeModel", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Bike Reg Number */}
        <div>
          <label className="font-semibold">Bike Registration Number</label>
          <input
            type="text"
            placeholder="e.g. DHAKA METRO HA-12345"
            {...register("bikeRegNo", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* About Rider */}
        <div>
          <label className="font-semibold">Tell us about Yourself</label>
          <textarea
            rows="4"
            placeholder="Write something about yourself..."
            {...register("about")}
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
