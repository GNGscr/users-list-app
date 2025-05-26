import React from 'react';
import { useUsersStore } from '../../store/useUsersStore';
import PieChart from '../../components/PieChart';
import styles from './statistics.module.css';

function StatisticsPage() {
  const { users } = useUsersStore();

  const STATISTICS_PAGE = "Statistics Page";

  const countryCounts = users.reduce((acc, user) => {
    const country = user.country || 'unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});
  
  return (
    <div className={styles.pageRoot}>
      <h1>{STATISTICS_PAGE}</h1>
      <PieChart data={countryCounts} />
    </div>
  )
}

export default StatisticsPage;
