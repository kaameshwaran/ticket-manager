'use client'
import { Card } from '@radix-ui/themes';
import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface Props {
  open: number;
  closed: number;
  inProgress: number;
  userIssues: { user: string; open: number; closed: number; inProgress: number }[];
}

const COLORS = {
  open: '#FF6B6B',
  inProgress: '#4ECDC4',
  closed: '#45B7D1',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border">
        <p className="font-bold">{label}</p>
        <p className="text-[#FF6B6B]">{`Open: ${payload[0]?.value || 0}`}</p>
        <p className="text-[#4ECDC4]">{`In Progress: ${payload[1]?.value || 0}`}</p>
        <p className="text-[#45B7D1]">{`Closed: ${payload[2]?.value || 0}`}</p>
      </div>
    );
  }
  return null;
};

const IssueChart = ({ open, closed, inProgress, userIssues = [] }: Props) => {
  const barData = React.useMemo(() => [
    { label: 'Open Issues', value: open },
    { label: 'In Progress Issues', value: inProgress },
    { label: 'Closed Issues', value: closed },
  ], [open, inProgress, closed]);

  if (!userIssues.length) {
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-center">No data available</h2>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 shadow-lg">
        {/* Overall Status Chart */}
        <motion.div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Overall Status</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" barSize={60}>
                  {barData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={Object.values(COLORS)[index]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* User Charts */}
        <motion.div>
          <h2 className="text-2xl font-bold my-8 text-center">Assigned to Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userIssues.map((userIssue, index) => {
              const pieData = [
                { name: 'Open', value: userIssue.open },
                { name: 'In Progress', value: userIssue.inProgress },
                { name: 'Closed', value: userIssue.closed },
              ];

              return (
                <motion.div
                  key={`user-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                      {userIssue.user}
                    </h3>
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={({ value }) => value > 0 ? value : ''}
                          >
                            {pieData.map((_, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={Object.values(COLORS)[index]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default IssueChart;