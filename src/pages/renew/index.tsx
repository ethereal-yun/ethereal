import { queryList } from '@/services/user';
import { useRequest } from '@umijs/max';
import React from 'react';
import styles from './index.less';
import List from '../../components/List'

export default function Page() {
  const { data, loading } = useRequest(() => queryList({
   pos:6
  }));
  
  return (
    <div>
      <h1 className={styles.title}>更新</h1>
      {!loading && <List list={data}></List>}
    </div>
  );
}
