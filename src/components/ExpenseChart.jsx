import { VictoryPie, VictoryLabel } from "victory";
import { useGlobalState } from "../context/GlobalState";
import { BsPieChartFill } from "react-icons/bs";

export function ExpenseChart() {
  const { transactions } = useGlobalState();

  const totalIncomes = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0) * -1;

  console.log({
    totalIncomes,
    totalExpenses,
  });

  const expensesPercentage = Math.round((totalExpenses / totalIncomes) * 100);
  const incomesPercentage = 100 - (expensesPercentage);

  if (totalIncomes === 0 && totalExpenses === 0) {
    return (
      <div className="bg-zinc-900 p-4 my-2">
        <div className="h-full flex items-center justify-center w-full flex-col">
          <BsPieChartFill className="text-9xl" />
          <h1 className="text-3xl font-bold my-2">No data yet</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950">
      <VictoryPie
        colorScale={["#e74c3c", "#2ecc71"]}
        data={[
          { x: "Expenses", y: expensesPercentage },
          { x: "Incomes", y: incomesPercentage },
        ]}
        animate={{
          duration: 2000,
        }}
        labels={({ datum }) => datum.y}
        labelComponent={
          <VictoryLabel
            angle={45}
            style={{
              fill: "white",
            }}
          />
        }
      />
    </div>
  );
}
