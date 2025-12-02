import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    // formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const navigate = useNavigate();

  //   region
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  //   console.log(regionsDuplicate);
  const regionSet = new Set(regionsDuplicate);
  //   console.log(regionSet);
  const regions = [...regionSet];
  //   console.log(regions);

  //   districts by region
  const senderRegion = watch("senderRegion");
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);

    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const isDocument = data.parcelType === "document";
    const parcelWeight = parseFloat(data.parcelWeight);

    console.log(isSameDistrict, isDocument, parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log(cost);
    data.cost = cost;
    Swal.fire({
      title: "Are you agree with the cost?",
      text: `You will be charged ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue to Pay",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel", res.data);
          navigate("/dashboard/my-parcels");
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Parcel record has been send",
              showConfirmButton: false,
              timer: 2500,
            });
          }
          // toast("Parcel send successful");
        });

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };
  return (
    <div className="my-10">
      <h2 className="text-base md:text-2xl font-semibold ">Send A Parcel</h2>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-10 p-4 space-y-5 "
      >
        {/* document */}
        <div className="flex gap-5 ">
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio radio-secondary"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="Non-Document"
              className="radio radio-secondary"
            />
            Non-Document
          </label>
        </div>

        {/* parcel info:name, weight */}
        <div className="md:flex gap-5">
          <fieldset className="fieldset flex-1 ">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full focus:outline-0 focus:border-0 focus:border-b-2"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset flex-1 ">
            <label className="label">Parcel Weight</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full focus:outline-0 focus:border-0 focus:border-b-2"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>

        {/* details part : sender & receiver */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* sender details */}
          <div>
            <h2 className="font-semibold">Sender Details</h2>

            {/* sender name */}
            <fieldset className="fieldset flex-1 ">
              <label className="label">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                defaultValue={user?.displayName}
                className="input w-full focus:outline-0 focus:border-0 focus:border-b-2"
                placeholder="Sender Name"
              />
            </fieldset>

            {/* sender email */}
            <fieldset className="fieldset flex-1 ">
              <label className="label">Sender Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                defaultValue={user?.email}
                className="input w-full focus:outline-0 focus:border-0 focus:border-b-2"
                placeholder="Sender Email"
              />
            </fieldset>

            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Region</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Select Region"
                className="select w-full "
              >
                <option disabled={true}>Select Region</option>
                {regions.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* sender Districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Select District"
                className="select w-full "
              >
                <option disabled={true}>Select District</option>
                {districtByRegion(senderRegion).map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {/* <span className="label">Optional</span> */}
            </fieldset>

            {/* sender Address */}
            <fieldset className="fieldset flex-1 ">
              <label className="label">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full focus:outline-0 focus:border-0 focus:border-b-2"
                placeholder="Sender Address"
              />
            </fieldset>

            {/* sender Phone */}
            <fieldset className="fieldset flex-1 ">
              <label className="label">Sender Phone</label>
              <input
                type="number"
                {...register("senderPhone")}
                className="input w-full focus:outline-0 focus:border-0 focus:border-b-2"
                placeholder="Sender Phone"
              />
            </fieldset>
          </div>

          {/* receiver details */}
          <div>
            <h2 className="font-semibold">Receiver Details</h2>

            {/* Receiver name */}
            <fieldset className="fieldset flex-1 ">
              <label className="label">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full focus:outline-0 focus:border-0 focus:border-b-2"
                placeholder="Receiver Name"
              />
            </fieldset>

            {/* Receiver Email */}
            <fieldset className="fieldset flex-1 ">
              <label className="label">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input w-full focus:outline-0 focus:border-0 focus:border-b-2"
                placeholder="Receiver Email"
              />
            </fieldset>

            {/* Receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Region</legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Select Region"
                className="select w-full "
              >
                <option disabled={true}>Select Region</option>
                {regions.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {/* <span className="label">Optional</span> */}
            </fieldset>

            {/* Receiver Districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Districts</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Select District"
                className="select w-full "
              >
                <option disabled={true}>Select District</option>
                {districtByRegion(receiverRegion).map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {/* <span className="label">Optional</span> */}
            </fieldset>

            {/* Receiver Address */}
            <fieldset className="fieldset flex-1 ">
              <label className="label">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full focus:outline-0 focus:border-0 focus:border-b-2"
                placeholder="Receiver Address"
              />
            </fieldset>

            {/* Receiver Phone */}
            <fieldset className="fieldset flex-1 ">
              <label className="label">Receiver Phone</label>
              <input
                type="number"
                {...register("receiverPhone")}
                className="input w-full focus:outline-0 focus:border-0 focus:border-b-2"
                placeholder="Receiver Phone"
              />
            </fieldset>
          </div>
        </section>

        {/* submit button */}
        <input className="btn w-full" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SendParcel;
