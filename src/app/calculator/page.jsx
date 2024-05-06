"use client";

import MemberCard from "@/components/MemberCard";
import TransactionCard from "@/components/TransactionCard";
import {
  Add,
  AdminPanelSettings,
  CurrencyRupee,
  Delete,
  ExitToApp,
  Groups,
  MarkAsUnread,
  Pin,
  PinDrop,
  PinRounded,
  QrCode2,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcLeave } from "react-icons/fc";

// pages/group/[id].js

const GroupPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [src, setSrc] = useState("");

  const getGroupName = async () => {
    try {
      const response = await axios.post("/api/get-groupname-by-id", {
        groupId: params.id,
      });
      if (response.data.status === 200) {
        console.log(response.data);
        setGroupName(response.data.gName);
      } else {
        toast.error("Could not find group");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroupName();
  }, []);

  const removeTransaction = async (transactionId) => {
    try {
      const response = await axios.post("/api/remove-transaction", {
        groupId: params.id,
        transactionId: currentTransaction,
      });
      if (response.data.status === 200) {
        toast.success("Transaction Deleted");
        setFetchingRequired((prev) => !prev);
        router.replace("/groups");
      } else {
        toast.error("Could not delete transaction");
      }
    } catch (error) {
      console.log(error);
    }
    // setTransactionArray(response.data.transactionsList);
  };

  const removeMember = async () => {
    const response = await axios.post("/api/remove-member", {
      groupId: params.id,
      memberId: session.user.id,
    });

    if (response.data.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    // setMemberArray(response.data.membersList);
    router.replace("/groups");
  };

  const [memberDetails, setMemberDetails] = useState({
    email: "",
  });

  const [transactionDetails, setTransactionDetails] = useState({
    name: "",
    description: "",
    members: [
      {
        id: 0,
        name: "",
        amountPaid: 0,
      },
    ],
  });

  const [finalTransactionList, setFinalTransactionList] = useState([]);

  const handleMemberNameChange = (index, newName) => {
    const updatedMembers = [...transactionDetails.members];
    updatedMembers[index].name = newName;

    setTransactionDetails((prevState) => ({
      ...prevState,
      members: updatedMembers,
    }));

    console.log(transactionDetails);
  };

  const handleMemberAmountChange = (index, amount) => {
    const updatedMembers = [...transactionDetails.members];
    updatedMembers[index].amountPaid = amount;

    setTransactionDetails((prevState) => ({
      ...prevState,
      members: updatedMembers,
    }));
  };

  const handleDeleteMember = (index) => {
    const updatedMembers = [...transactionDetails.members];
    updatedMembers.splice(index, 1);

    setTransactionDetails((prevState) => ({
      ...prevState,
      members: updatedMembers,
    }));

    console.log(updatedMembers);
    for (let index = 0; index < updatedMembers.length; index++) {
      updatedMembers[index].id = index;
    }
    console.log(updatedMembers);
  };

  const transactionSubmitHandler = async (e) => {
    try {
      console.log(transactionDetails);
      // console.log("ADFJSDOifaohfodofenofoeh");
      const response = await axios.post("/api/create-transaction", {
        transactionDetails, // sender, receiver, amount
        groupId: params.id,
        name: transactionDetails.name,
        description: transactionDetails.description,
        members: transactionDetails.members,
      });

      console.log(response.data);
      setFetchingRequired((prev) => !prev);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const addMember = (e) => {
    e.preventDefault();
    const newId = transactionDetails.members.length;
    // if (newId >= members.length) return;
    const newMember = {
      id: newId,
      name: "",
      amountPaid: 0,
    };
    setTransactionDetails((prevState) => ({
      ...prevState,
      members: [...prevState.members, newMember],
    }));
  };

  const getAllMembers = async () => {
    try {
      const response = await axios.post("/api/get-all-members", {
        groupId: params.id,
      });
      setMembers(response.data.memberList);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllTransactions = async () => {
    try {
      const response = await axios.post("/api/get-all-transactions", {
        groupId: params.id,
      });
      setTransactions(response.data.transactionList);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(0);
    }
  };

  const deleteGroup = async () => {
    try {
      const response = await axios.post("/api/remove-group", {
        groupId: params.id,
        memberId: session.user.id,
      });
      if (response.data.status === 200) {
        toast.success(response.data.message);
        setFetchingRequired((prev) => !prev);
        router.push("/groups");
        `/groups`;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loader, setLoader] = useState(1);
  const [fetchingRequired, setFetchingRequired] = useState(0);

  // useEffect(()=>)
  useEffect(() => {
    getAllMembers();
    getAllTransactions();
  }, [loader, setLoader, fetchingRequired, setFetchingRequired]);

  const [members, setMembers] = useState([]);

  const [transactions, setTransactions] = useState([]);

  const [transactionFormModal, setTransactionFormModal] = useState(0);

  const [eachTransactionModal, setEachTransactionModal] = useState(0);

  const openTransaction = async (id) => {
    try {
      setEachTransactionModal(1);
      const response = await axios.post("/api/get-a-transaction", { id });
      console.log(response.data);
      setFinalTransactionList(response.data.finalTransactionArray);
      setCurrentTransaction(id);
    } catch (error) {
      console.log(error);
    }
  };

  const [currentTransaction, setCurrentTransaction] = useState("");
  return (
    <>
      <div>
        {transactionFormModal ? (
          <div
            id="transaction"
            className="modal-animation overflow-y-scroll h-[500px] fixed left-[50%] mx-auto z-40 text-tertiary flex flex-col justify-start w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-lg m-12 p-5 shadow-md shadow-slate-700 bg-primary"
          >
            <div
              className={` text-md text-center border-2 border-secondary bg-secondary rounded-xl w-[70%] mx-auto p-2`}
            >
              CREATE A TRANSACTION
            </div>

            <form className="text-md flex flex-col justify-around">
              <div className="flex flex-col mt-2">
                <div>Transaction Name</div>
                <input
                  type="text"
                  onChange={(e) => {
                    setTransactionDetails({
                      ...transactionDetails,
                      name: e.target.value,
                    });
                  }}
                  value={transactionDetails.name}
                  className="my-2 p-1 px-2 rounded-lg outline-none border-2 border-backup bg-secondary w-full"
                />
              </div>

              <div className="flex flex-col">
                <div>Description (MAX 20 WORDS)</div>
                <input
                  type="text"
                  onChange={(e) => {
                    setTransactionDetails({
                      ...transactionDetails,
                      description: e.target.value,
                    });
                  }}
                  value={transactionDetails.description}
                  className="my-2 p-1 px-2 rounded-lg outline-none border-2 border-backup bg-secondary w-full"
                />
              </div>

              {transactionDetails.members.map((member, index) => (
                <div className="flex flex-col my-2" key={member.id}>
                  <div className="flex items-center justify-start w-full">
                    <div className="flex flex-col w-full">
                      <div>Member {member.id + 1}</div>
                      <div className="flex items-center justify-center w-full">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) =>
                            handleMemberNameChange(index, e.target.value)
                          }
                          className="p-1 px-2 rounded-lg outline-none border-2 border-backup bg-secondary w-full"
                        />
                      </div>
                      <div>Amount Paid By Member {member.id + 1}</div>
                      <div className="flex items-center justify-center w-full">
                        <input
                          type="number"
                          value={member.amountPaid}
                          onChange={(e) =>
                            handleMemberAmountChange(index, e.target.value)
                          }
                          onWheel={(e) => e.target.blur()}
                          className="p-1 px-2 rounded-lg outline-none border-2 border-backup bg-secondary w-full"
                        />
                      </div>
                    </div>
                    <div className=" flex justify-center">
                      <Delete
                        className="text-red-600 text-md cursor-pointer"
                        onClick={() => handleDeleteMember(index)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="coolBeans flex justify-center p-3 border-secondary bg-secondary rounded-xl w-[40%] mx-auto mt-2"
                onClick={addMember}
              >
                Add Member
              </button>
              <button
                type="submit"
                className="coolBeans flex justify-center p-3 border-2 border-secondary bg-secondary rounded-xl w-[40%] mx-auto mt-3"
                // onClick={transactionSubmitHandler}
              >
                Submit
              </button>
            </form>
          </div>
        ) : null}

        <div
          className={`flex flex-col mb-10 ${transactionFormModal || eachTransactionModal ? "blur-sm" : ""}`}
          onClick={() => {
            if (transactionFormModal === 1) {
              setTransactionFormModal(0);
            }

            if (eachTransactionModal === 1) {
              setEachTransactionModal(0);
            }
          }}
        >
          {loader ? (
            <div className="mt-4 loader mx-auto"></div>
          ) : (
            <div className="flex flex-col p-6">
              <button
                onClick={() => {
                  setTransactionFormModal(1);
                }}
                className="mb-10 coolBeans hover:opacity-100 opacity-85 m-2 flex items-center justify-center h-[100px] w-[80%] sm:w-[20%] bg-secondary shadow-md shadow-tertiary"
              >
                <Add className="text-3xl mr-2" />
                Add Transaction
              </button>

              <div>
                <h2 className="text-2xl font-bold mb-2">Transactions</h2>
                {transactions.length === 0 ? (
                  <div>No Transactions</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {transactions.map((transaction, index) => (
                      <div
                        key={index}
                        className="coolBeans form-shade text-tertiary cursor-pointer rounded-2xl shadow-lg shadow-secondary p-6"
                        // onClick={() => {
                        //   openTransaction(transaction._id);
                        // }}
                      >
                        <h2 className="text-xl font-bold mb-2">
                          {transaction.transactionName}
                        </h2>
                        <p className="">{transaction.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupPage;
