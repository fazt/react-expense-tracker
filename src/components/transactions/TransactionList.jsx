import { useGlobalState } from "../../context/GlobalState";
import { TransactionItem } from "./TransactionItem";

export function TransactionList() {
  const { transactions } = useGlobalState();

  return (
    <>
      <h3 className="text-slate-300 text-xl font-bold my-2">History</h3>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
}
