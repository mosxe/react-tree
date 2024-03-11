import { useState, useEffect } from 'react';
import TreeComponent from 'components/Tree';
import Loader from 'components/Loader';
import Error from 'components/Error';
import { NodeType } from 'components/Tree/Node';
import { fetchData } from './utils';
import styles from './styles.module.scss';

export type Props = {
  photo: string;
  fullname: string;
  data: NodeType[];
  isError: boolean;
  errorMessage: string;
};

const initialState = {
  photo: '',
  fullname: '',
  data: [],
  isError: false,
  errorMessage: ''
};

const Tree = () => {
  const [data, setData] = useState<Props>(initialState);
  const [isLoading, setLoading] = useState<boolean>(true);
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

  if (isError || data.isError) {
    return <Error message={data.errorMessage} />;
  }

  return (
    <>
      <h1 className={styles.title}>Иерархия подчинённых</h1>
      <section>
        <div className={styles['tree-persons']}>
          <div className={styles['tree-persons__avatar']}>
            <img src={data.photo} alt='Фото' />
          </div>
          <span className={styles['tree-persons__name']}>
            <strong>{data.fullname}</strong>
          </span>
        </div>
        <TreeComponent data={data.data} onLoadData={fetchData} />
      </section>
    </>
  );
};

export default Tree;
