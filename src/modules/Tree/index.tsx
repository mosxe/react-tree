import { useState, useEffect } from 'react';
import TreeComponent from 'components/Tree';
import Loader from 'components/Loader';
import Error from 'components/Error';
import { NodeType } from 'components/Tree/Node';
import { fetchData } from './utils';
import styles from './styles.module.scss';

type Props = {
  photo: string;
  fullname: string;
  data: NodeType[];
};

const initialState = {
  photo: '',
  fullname: '',
  data: []
};

const Tree = () => {
  const [data, setData] = useState<Props>(initialState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchData('')
      .then((res) => setData(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <section>
      <div className={styles['tree-persons']}>
        <div className={styles['tree-persons__avatar']}>
          <img src='' alt='Фото' />
        </div>
        <span className={styles['tree-persons__name']}>
          <strong>Алексеев Кирилл Владимирович</strong>
        </span>
      </div>
      <TreeComponent data={data.data} onLoadData={fetchData} />
    </section>
  );
};

export default Tree;
