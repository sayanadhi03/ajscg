import React, { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { ToastContainer, toast } from "react-toastify";
import { useGetTransactions } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { useNavigate } from "react-router-dom";

const Expense = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState();
  const [transactionType, setTransactionType] = useState("expense");

  const { balance,income, expense } = transactionTotals;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("");
    toast("Transaction Added Successfully");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // Debug log to check if we're getting the profile photo
  console.log("Profile Photo URL:", profilePhoto);
  console.log("User Name:", name);

  return (
    <div className="expense-tracker">
      <div className="container max-w-3xl mx-auto p-6">
        {/* Header with title and profile */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">
            {name}'s Expense Tracker
          </h1>

          {(profilePhoto || name) && (
            <div className="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg shadow">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover"
                  onError={(e) => {
                    console.log("Image failed to load:", profilePhoto);
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}

              {/* Fallback avatar */}
              <div
                className="w-12 h-12 rounded-full border-2 border-gray-600 bg-gray-600 flex items-center justify-center"
                style={{ display: profilePhoto ? "none" : "flex" }}
              >
                <svg
                  className="w-6 h-6 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>

              <div className="hidden sm:block">
                <p className="text-white text-sm font-medium">
                  {name || "User"}
                </p>
                <p className="text-gray-400 text-xs">Online</p>
              </div>
              <button
                onClick={signUserOut}
                className="flex items-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 text-xs font-medium"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          )}
        </div>

        <div className="balance mb-4 bg-gray-800 p-4 rounded shadow">
          <h3 className="text-sm text-gray-400">Your Balance</h3>
          {balance >= 0 ? (
<h2 className="text-2xl font-semibold text-white">${balance}</h2>
          ) :(
            <h2 className="text-2xl font-semibold text-white">$-{balance*-1}</h2>
          )
        
        }
          
        </div>

        <div className="summary grid grid-cols-2 gap-4 mb-6">
          <div className="income bg-green-900 p-4 rounded shadow">
            <h4 className="text-sm font-medium text-green-300">Income</h4>
            <p className="text-lg font-bold text-green-100">${income}</p>
          </div>

          <div className="expenses bg-red-900 p-4 rounded shadow">
            <h4 className="text-sm font-medium text-red-300">Expenses</h4>
            <p className="text-lg font-bold text-red-100">${expense}</p>
          </div>
        </div>

        <form
          className="add-transaction bg-gray-800 p-4 rounded shadow mb-6"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              placeholder="Amount"
              required
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded"
            />
          </div>

          <div className="mb-3 flex items-center gap-3">
            <input
              type="radio"
              id="expense"
              name="type"
              checked={transactionType === "expense"}
              value="expense"
              onChange={(e) => setTransactionType(e.target.value)}
              className="text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
            />
            <label htmlFor="expense" className="text-sm text-gray-300">
              Expense
            </label>

            <input
              type="radio"
              id="income"
              name="type"
              checked={transactionType === "income"}
              value="income"
              onChange={(e) => setTransactionType(e.target.value)}
              className="text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 ml-4"
            />
            <label htmlFor="income" className="text-sm text-gray-300">
              Income
            </label>
          </div>

          <button
            onSubmit={handleSubmit}
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white rounded"
          >
            Add Transaction
            <ToastContainer />
          </button>
        </form>

        <div className="transactions bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Transactions
          </h3>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg mb-2">
                No transactions yet
              </div>
              <div className="text-gray-500 text-sm">
                Add your first transaction above
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction, index) => {
                const { description, transactionAmount, transactionType } =
                  transaction;
                const isIncome = transactionType === "income";
                return (
                  <div
                    key={`${description}-${index}`}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-650 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          isIncome ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          {description}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            isIncome
                              ? "bg-green-900 text-green-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {transactionType}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        isIncome ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {isIncome ? "+" : "-"}${Math.abs(transactionAmount)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expense;
