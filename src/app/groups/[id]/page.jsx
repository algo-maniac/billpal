"use client";

import MemberCard from "@/components/MemberCard";
import TransactionCard from "@/components/TransactionCard";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

// pages/group/[id].js

const GroupPage = ({ params }) => {
  // useEffect(() => {
  //   const getAllMembers = async () => {
  //     const response = await axios.post("/api/get-all-members", {groupId:params.id});
  //     setMemberArray(response.data.membersList);
  //   };
  //   getAllMembers();
  // }, []);

  // useEffect(() => {
  //   const getAllTransactions = async () => {
  //     const response = await axios.post("/api/get-all-transactions", {groupId:params.id});
  //     setTransactionArray(response.data.transactionsList);
  //   };
  //   getAllMembers();
  // }, []);

  const removeTransaction = async (transactionId) => {
    const response = await axios.post("/api/remove-transaction", {
      groupId: params.id,
      transactionId,
    });
    setTransactionArray(response.data.transactionsList);
  };

  const removeMember = async (memberId) => {
    const response = await axios.post("/api/remove-member", {
      groupId: params.id,
      memberId,
    });
    setMemberArray(response.data.membersList);
  };

  const [memberDetails, setMemberDetails] = useState({
    email: "",
  });

  const [transactionDetails, setTransactionDetails] = useState({
    name: "",
    members: [
      {
        id: 0,
        name: "",
        amountPaid: 0,
      },
    ],
  });

  const [memberArray, setMemberArray] = useState([
    {
      id: 0,
      name: "Jessica Anderson",
      email: "jessica.anderson@example.com",
      upiId: "jessica.anderson@upi",
    },
    {
      id: 1,
      name: "Samuel Patel",
      email: "samuel.patel@example.com",
      upiId: "samuel.patel@upi",
    },
    {
      id: 2,
      name: "Emily Nguyen",
      email: "emily.nguyen@example.com",
      upiId: "emily.nguyen@upi",
    },
    {
      id: 3,
      name: "Alex Thompson",
      email: "alex.thompson@example.com",
      upiId: "alex.thompson@upi",
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      upiId: "maria.garcia@upi",
    },
  ]);

  const [transactionArray, setTransactionArray] = useState([
    {
      name: "Transaction 1",
      members: [
        { id: 1, name: "John", amountPaid: 20, amountToBePaid: 30 },
        { id: 2, name: "Alice", amountPaid: 15, amountToBePaid: 25 },
      ],
    },
    {
      name: "Transaction 2",
      members: [
        { id: 3, name: "Bob", amountPaid: 25, amountToBePaid: 20 },
        { id: 4, name: "Emily", amountPaid: 30, amountToBePaid: 18 },
      ],
    },
    {
      name: "Transaction 3",
      members: [
        { id: 5, name: "David", amountPaid: 18, amountToBePaid: 22 },
        { id: 6, name: "Sophie", amountPaid: 22, amountToBePaid: 15 },
      ],
    },
    {
      name: "Transaction 4",
      members: [
        { id: 7, name: "Michael", amountPaid: 25, amountToBePaid: 30 },
        { id: 8, name: "Olivia", amountPaid: 20, amountToBePaid: 18 },
      ],
    },
    {
      name: "Transaction 5",
      members: [
        { id: 9, name: "Daniel", amountPaid: 15, amountToBePaid: 25 },
        { id: 10, name: "Emma", amountPaid: 28, amountToBePaid: 23 },
      ],
    },
    {
      name: "Transaction 6",
      members: [
        { id: 11, name: "Sophia", amountPaid: 22, amountToBePaid: 15 },
        { id: 12, name: "James", amountPaid: 18, amountToBePaid: 25 },
      ],
    },
    {
      name: "Transaction 7",
      members: [
        { id: 13, name: "William", amountPaid: 35, amountToBePaid: 20 },
        { id: 14, name: "Ella", amountPaid: 20, amountToBePaid: 18 },
      ],
    },
    {
      name: "Transaction 8",
      members: [
        { id: 15, name: "Alexander", amountPaid: 25, amountToBePaid: 30 },
        { id: 16, name: "Mia", amountPaid: 15, amountToBePaid: 22 },
      ],
    },
    {
      name: "Transaction 9",
      members: [
        { id: 17, name: "Abigail", amountPaid: 22, amountToBePaid: 15 },
        { id: 18, name: "Benjamin", amountPaid: 28, amountToBePaid: 23 },
      ],
    },
    {
      name: "Transaction 10",
      members: [
        { id: 19, name: "Charlotte", amountPaid: 18, amountToBePaid: 25 },
        { id: 20, name: "Aiden", amountPaid: 25, amountToBePaid: 30 },
      ],
    },
  ]);

  const [finalTransactionList, setFinalTransactionList] = useState([]);
  const addMember = (e) => {
    e.preventDefault();
    const newId = transactionDetails.members.length;
    if (newId > 5) return;
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

  const handleMemberNameChange = (index, newName) => {
    const updatedMembers = [...transactionDetails.members];
    updatedMembers[index].name = newName;

    setTransactionDetails((prevState) => ({
      ...prevState,
      members: updatedMembers,
    }));
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

  const memberSubmitHandler = () => {
    console.log(memberDetails);
  };

  const transactionSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(transactionDetails);
    let len = transactionDetails.members.length;
    let totalAmount = Number(0);
    for (let i = 0; i < len; i++) {
      totalAmount += Number(transactionDetails.members[i].amountPaid);
      // console.log(Number(transactionDetails.members[i].amountPaid));
      console.log(totalAmount);
    }
    let average = totalAmount / len;
    console.log(totalAmount);
    console.log(average);
    console.log(typeof average);

    let senderList = [],
      receiverList = [];
    for (let i = 0; i < len; i++) {
      let paid = Number(transactionDetails.members[i].amountPaid);
      console.log(typeof paid);
      if (paid < average) {
        senderList.push({
          ...transactionDetails.members[i],
          amountToBePaid: Math.abs(paid - average),
        });
      }
      if (paid > average) {
        receiverList.push({
          ...transactionDetails.members[i],
          amountToBeReceived: Math.abs(paid - average),
        });
      }
    }
    console.log(senderList);
    console.log(receiverList);

    console.log(20);
    let finalList = [];

    let i = 0,
      j = 0;
    let len1 = senderList.length,
      len2 = receiverList.length;
    while (i < len1 && j < len2) {
      if (senderList[i].amountToBePaid > receiverList[j].amountToBeReceived) {
        finalList.push({
          sender: senderList[i].name,
          receiver: receiverList[j].name,
          amount: receiverList[j].amountToBeReceived.toFixed(2),
        });
        senderList[i].amountToBePaid =
          senderList[i].amountToBePaid - receiverList[j].amountToBeReceived;

        receiverList[j].amountToBeReceived = 0;
        j++;
      } else if (
        senderList[i].amountToBePaid < receiverList[j].amountToBeReceived
      ) {
        finalList.push({
          sender: senderList[i].name,
          receiver: receiverList[j].name,
          amount: senderList[i].amountToBePaid.toFixed(2),
        });
        senderList[i].amountToBePaid = 0;
        receiverList[j].amountToBeReceived =
          receiverList[j].amountToBeReceived - senderList[i].amountToBePaid;
        i++;
      } else {
        finalList.push({
          sender: senderList[i].name,
          receiver: receiverList[j].name,
          amount: senderList[i].amountToBePaid.toFixed(2),
        });

        senderList[i].amountToBePaid = 0;
        receiverList[i].amountToBeReceived = 0;
        i++;
        j++;
      }
    }
    console.log(senderList);
    console.log(receiverList);
    console.log(finalList);
    setFinalTransactionList(finalList);
    // const response = await axios.post("/api/create-transaction", {
    //   ...finalTransactionList, // sender, receiver, amount
    //   groupId: params.id,
    //   name: transactionDetails.name,
    //   members: transactionDetails.members,
    // });
  };
  return (
    <div className="flex flex-col items-center mt-2">
      <h1 className="text-tertiary text-5xl">Group Name</h1>
      <div className="text-tertiary flex flex-col justify-center w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-lg m-10 p-5 shadow-md shadow-slate-700 bg-primary">
        <div className="text-2xl text-center border-2 border-secondary bg-secondary rounded-xl w-[60%] mx-auto py-2">
          Add a member
        </div>
        <form className="text-xl flex flex-col justify-around">
          <div className="flex flex-col my-2">
            <div>Email</div>
            <input
              type="email"
              onChange={(e) => {
                setMemberDetails({ ...memberDetails, email: e.target.value });
              }}
              value={memberDetails.email}
              className="p-1 px-2 rounded-lg outline-none border-2 border-backup bg-backup w-full"
            />
          </div>

          <button
            type="submit"
            className="p-2 border-2 border-secondary bg-secondary rounded-xl w-[40%] mx-auto my-5"
            onClick={memberSubmitHandler}
          >
            Submit
          </button>
        </form>
      </div>
      <h1 className="text-tertiary text-5xl">Members</h1>
      <div className="flex justify-around items-center w-full flex-wrap">
        {memberArray.map((member) => (
          <MemberCard
            key={member.id}
            id={member.id}
            name={member.name}
            email={member.email}
            upiId={member.upiId}
            removeMember={removeMember}
          />
        ))}
      </div>
      <div className="text-tertiary flex flex-col justify-center w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-lg m-10 p-5 shadow-md shadow-slate-700 bg-primary">
        <div className="text-2xl text-center border-2 border-secondary bg-secondary rounded-xl w-[60%] mx-auto py-2">
          Add a transaction
        </div>
        <form className="text-xl flex flex-col justify-around">
          <div className="flex flex-col my-2">
            <div>Transaction Name</div>
            <input
              type="text"
              onChange={(e) => {
                setTransactionDetails({
                  ...transactionDetails,
                  name: e.target.value,
                });
              }}
              value={memberDetails.name}
              className="p-1 px-2 rounded-lg outline-none border-2 border-backup bg-backup w-full"
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
                      className="p-1 px-2 rounded-lg outline-none border-2 border-backup bg-backup w-full"
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
                      className="p-1 px-2 rounded-lg outline-none border-2 border-backup bg-backup w-full"
                    />
                  </div>
                </div>
                <div className=" flex justify-center">
                  <Delete
                    className="text-secondary text-3xl cursor-pointer"
                    onClick={() => handleDeleteMember(index)}
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="p-2 border-2 border-secondary bg-secondary rounded-xl w-[40%] mx-auto my-5"
            onClick={addMember}
          >
            Add Member
          </button>
          <button
            type="submit"
            className="p-2 border-2 border-secondary bg-secondary rounded-xl w-[40%] mx-auto my-5"
            onClick={transactionSubmitHandler}
          >
            Submit
          </button>
        </form>
      </div>
      <h1 className="text-tertiary text-5xl">Transactions</h1>
      <div className="flex justify-around items-center w-full flex-wrap">
        {transactionArray.map((transaction, index) => (
          <TransactionCard
            key={index}
            id={transaction.id}
            name={transaction.name}
            members={transaction.members}
            finalTransactionList={finalTransactionList}
            removeTransaction={removeTransaction}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupPage;
