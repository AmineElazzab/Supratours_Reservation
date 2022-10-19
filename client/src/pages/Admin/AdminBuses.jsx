import React from "react";
import BusForm from "../../components/BusForm";
import PageTitle from "../../components/PageTitle";

function AdminBuses() {
  const [showBusForm, setShowBusForm] = React.useState(false);
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Buses" />
        <button className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
        onClick={()=>setShowBusForm(true)}
        >
          Add Bus
        </button>
      </div>

      {showBusForm && <BusForm showBusForm={showBusForm} setShowBusForm={setShowBusForm} />} 

    </div>
  );
}

export default AdminBuses;
