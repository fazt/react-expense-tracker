import { VictoryPie, VictoryLabel } from "victory";
import { useGlobalState } from "../context/GlobalState";

export function ExpenseChart() {
  const { transactions } = useGlobalState();

  const total = transactions.reduce(
    (acc, transaction) => (acc += Math.abs(transaction.amount)),
    0
  );

  const totalIncomes = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => (acc += transaction.amount) * -1, 0);

  const incomes = Math.abs((totalIncomes / total) * 100);
  const expenses = Math.abs((totalExpenses / total) * 100);

  return (
    <VictoryPie
      colorScale={["#e74c3c", "#2ecc71"]}
      data={[
        { x: "Expenses", y: expenses },
        { x: "Incomes", y: incomes },
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
  );
}
