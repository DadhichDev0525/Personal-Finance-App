
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
    <div className="flex  items-center justify-center py-10 min-w-76 h-76">
      <div
        className="min-w-32 min-h-32 max-w-56 max-h-56 w-full h-full rounded-full mt-4 flex justify-center items-center "
        style={{
          background: `conic-gradient(${gradient})`,
        }}
      >
        <div className="max-w-40 max-h-40 min-w-28 min-h-28 w-full h-full rounded-full bg-white flex flex-col justify-center items-center">
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
