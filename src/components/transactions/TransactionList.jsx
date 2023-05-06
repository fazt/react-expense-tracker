import { useGlobalState } from "../../context/GlobalState";
import { TransactionItem } from "./TransactionItem";

export function TransactionList() {
  const { transactions } = useGlobalState();

  if (transactions.length === 0) {
    return (
      <div className="bg-zinc-900 p-4 my-2">
        <div className="h-full flex items-center justify-center w-full flex-col">
          <h1 className="text-xl font-bold my-2">
            There are no transactions yet
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 p-4">
      <h3 className="text-slate-300 text-xl font-bold my-2 text-center">History</h3>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
}
