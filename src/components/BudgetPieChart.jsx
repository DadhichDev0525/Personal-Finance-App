
const BudgetPieChart = ({budgets}) => {
  const totalSpent = budgets.reduce((acc, b) => acc + Number(b.spent), 0);
  const totalMaxSpend = budgets.reduce(
    (sum, budget) => sum + Number(budget.maxSpend),
    0
  );

  let accumulatedPercentage = 0; // To track the start point of each segment

  // Construct conic-gradient based on budget's maxSpend proportion
  const gradient = budgets
    .map((budget) => {
      const portion = (budget.maxSpend / totalMaxSpend) * 100;
      const segment = `${budget.theme} ${accumulatedPercentage}% ${
        accumulatedPercentage + portion
      }%`;
      accumulatedPercentage += portion; // Update start for the next budget
      return segment;
    })
    .join(", ");

  return (
    <div className="flex  items-center justify-center p-10  h-72">
      <div
        className="min-w-28 min-h-28 max-w-48 max-h-48 w-full h-full rounded-full mt-4 flex justify-center items-center "
        style={{
          background: `conic-gradient(${gradient})`,
        }}
      >
        <div className="w-28 h-28 rounded-full bg-white flex flex-col justify-center items-center">
          <span className="text-3xl font-medium text-gray-900">
            ${Math.abs(totalSpent)}
          </span>
          <span className="font-medium text-xs text-gray-500">
            of ${totalMaxSpend} limit
          </span>
        </div>
      </div>

    </div>
  );
};

export default BudgetPieChart;
