import CardTitle from "@/components/atoms/CardTitle";
import Span from "@/components/atoms/Span";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Switch from "../dashboard-account/Switch";
import ChartDropdownCom from "../dashboard-account/ChartDropdown";
import ChartDatePicker from "../dashboard-account/ChartDatePicker";

type FirstChartProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  chartDataKeys: string[];
  title: string;
  subtitle: string;
  error: boolean;
  incomeLabel: string;
  expenseLabel: string;
  currencyFormatter: (value: number) => string;
  isLoading: boolean;
};

const FirstChart: React.FC<FirstChartProps> = ({
  data,
  chartDataKeys,
  error,
  isLoading,
  title,
  subtitle,
  incomeLabel,
  expenseLabel,
  currencyFormatter,
}) => {
  const [isBarChart, setIsBarChart] = useState<boolean>(true);

  return (
    <div className="h-[450px] flex flex-col">
      <div className="px-4 flex flex-col sm:flex-row items-start md:items-center justify-between mb-3">
        {/* Title Section */}
        <div>
          <span className="text-sm sm:text-lg  font-normal text-[#243045] dark:text-white">
            Income/Expense
          </span>
        </div>

        {/* Switch and Dropdown Section */}
        <div className="flex items-center justify-center gap-4 mt-3 md:mt-0">
          {/* Switch Section */}
          <Switch
            isChecked={!isBarChart}
            onChange={(checked) => setIsBarChart(!checked)}
          />

          {/* Orders Dropdown */}
          <ChartDropdownCom />

          {/* Day Picker Section */}
          <ChartDatePicker />
        </div>
      </div>

      {/* Title and Bar Legend Section */}
      <div className="h-[50px] flex flex-col sm:flex-row items-start md:items-center justify-between px-4 mb-3">
        <CardTitle className="text-lg sm:text-2xl font-semibold text-[#243045] dark:text-white">
          {title}
          <Span className="text-sm text-[#8391A1] font-bold">{subtitle}</Span>
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-4 sm:h-4 bg-[#8884d8]"></div>
            <Span className="text-xs sm:text-sm">{incomeLabel}</Span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-4 sm:h-4 bg-[#82ca9d]"></div>
            <Span className="text-xs sm:text-sm">{expenseLabel}</Span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-grow flex flex-col justify-center  overflow-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div>
            {/* Conditionally render BarChart or LineChart */}
            {isBarChart ? (
              <div className="mb-0">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data || []}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    className="dark:text-white"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="dark:text-white"
                    />
                    <XAxis dataKey="name" className="dark:text-white" />
                    <YAxis tickFormatter={currencyFormatter} />
                    <Tooltip formatter={currencyFormatter} />
                    {chartDataKeys.map((key, index) => (
                      <Bar
                        key={key}
                        dataKey={key}
                        fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                        barSize={18}
                        className="dark:text-white"
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data || []}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={currencyFormatter} />
                  <Tooltip formatter={currencyFormatter} />
                  {chartDataKeys.map((key, index) => (
                    <Line
                      key={key}
                      dataKey={key}
                      stroke={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                      strokeWidth={3}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstChart;
