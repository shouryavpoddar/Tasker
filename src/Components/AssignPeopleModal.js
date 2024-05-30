import React from "react";
import Modal from "react-modal";

function AssignPeopleModal({data, selectedPerson, selectPerson}) {
    const [showModal, setShowModal] = React.useState(false);

    function openModal() {
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }


    return (
        <div>
            {selectedPerson ?
                <div key={data.indexOf(selectedPerson)} className="flex justify-between items-center border-gray-300 py-2"
                >
                    <div className="flex items-center">
                        <img
                            src={selectedPerson.picture.large}
                            alt={selectedPerson.name.first}
                            className="w-12 h-12 mr-3"
                        />
                        <div className="flex flex-col">
                            <strong className="ml-2">{selectedPerson.name.first} {selectedPerson.name.last}</strong>
                            <span className="text-slate-500 text-sm font-medium">
                                {selectedPerson.location.city}, {selectedPerson.location.state}, {selectedPerson.location.country}
                            </span>
                        </div>
                    </div>
                    <button type={"button"} onClick={openModal} className="border-black bg-red-500 py-2 px-2 ml-2 rounded-xl">
                        X
                    </button>
                </div>
                :
                <button type="button" onClick={openModal} className="w-full border-black bg-blue-500 py-2 px-4 mr-10 mb-2 rounded-xl"
                >
                    Assign Person
                </button>}
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                className="bg-gray-50 max-w-sm flex items-center justify-center ml-auto mr-auto mt-32 rounded-2xl"
            >
                <div className="col-auto">
                    <div className="overflow-y-auto max-h-96 w-full bg-gray-50 p-5 rounded-2xl">
                        {data.map((person, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border-b-2 border-gray-300 py-2"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={person.picture.large}
                                        alt={person.name.first}
                                        className="w-12 h-12 mr-3"
                                    />
                                    <div className="flex flex-col">
                                        <strong className="ml-2">{person.name.first} {person.name.last}</strong>
                                        <span className="text-slate-500 text-sm font-medium">
                                            {person.location.city}, {person.location.state}, {person.location.country}
                                        </span>
                                    </div>
                                </div>
                                <button onClick={() => {selectPerson(person); closeModal(); }} className="border-black bg-blue-500 py-2 px-4 mr-2 rounded-xl">
                                    Assign
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button
                            onClick={closeModal}
                            className="w-full border-black bg-red-500 py-2 px-4 mt-4 rounded-xl"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AssignPeopleModal;
